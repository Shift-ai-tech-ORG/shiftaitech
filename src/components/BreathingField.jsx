import { useEffect, useRef } from 'react'
import { isMotionPaused, subscribeMotion } from '../lib/motion'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

/* Lit liquid-metal surface: a height field with a real light, slow swell and a pointer ripple.
   Near-black graphite with one purple spot. Pattern borrowed from the QLM sector materials. */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_reach;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    a *= 0.5;
  }
  return v;
}

vec2 g_m;
float g_t;

float height(vec2 p) {
  vec2 q = p * 2.2;
  float w = fbm(q + vec2(0.0, g_t * 0.35));
  float h = fbm(q * 1.3 + w * 1.6 - vec2(g_t * 0.2, 0.0));
  float d = length(p - g_m);
  float ripple = sin(d * 18.0 - g_t * 2.4) * exp(-d * 3.2) * 0.05;
  return h * 0.55 + ripple;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  g_m = vec2((u_mouse.x - 0.5) * aspect, u_mouse.y - 0.5);
  g_t = u_time;

  float e = 0.004;
  float h = height(p);
  float hx = height(p + vec2(e, 0.0)) - h;
  float hy = height(p + vec2(0.0, e)) - h;
  vec3 n = normalize(vec3(-hx / e * 0.7, -hy / e * 0.7, 1.0));

  vec3 L = normalize(vec3(g_m.x - p.x + 0.35, g_m.y - p.y + 0.5, 0.55));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float diff = clamp(dot(n, L), 0.0, 1.0);
  vec3 H = normalize(L + V);
  float spec = pow(clamp(dot(n, H), 0.0, 1.0), 70.0);
  float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.0);

  vec3 base = vec3(0.06, 0.055, 0.08);
  vec3 purple = vec3(0.62, 0.36, 1.0);
  vec3 col = base + diff * vec3(0.07, 0.06, 0.1);
  col += purple * rim * 1.1;
  col += purple * 0.9 * spec + vec3(0.9, 0.85, 1.0) * spec * 0.7;

  // Fade into the page so the left edge (under the type) stays clean
  // Organic left edge: the surface holds the right side and spills leftwards in slow drips
  float n1 = fbm(vec2(uv.y * 2.4, g_t * 0.1));
  float n2 = fbm(vec2(uv.y * 7.0 + 3.0, g_t * 0.18 + 5.0));
  float reach = u_reach - (n1 - 0.32) * 0.8 - (n2 - 0.5) * 0.16 - sin(g_t * 0.45) * 0.03;
  float side = smoothstep(reach - 0.1, reach + 0.24, uv.x);
  float edge = side * smoothstep(0.0, 0.14, uv.y) * smoothstep(0.0, 0.14, 1.0 - uv.y);
  float alpha = clamp(edge * u_intensity, 0.0, 1.0);
  col += (hash(gl_FragCoord.xy + floor(g_t * 8.0)) - 0.5) * 0.02;
  gl_FragColor = vec4(col * alpha, alpha);
}
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl, vertSrc, fragSrc) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vertSrc)
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  if (!vs || !fs) return null
  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

/**
 * Fluid river - Kota-style vertical paint streams in Shift purple.
 */
export default function BreathingField({ className = '', interactive = true, reach = 0.16 }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: 'high-performance',
    })
    if (!gl) return undefined

    const program = createProgram(gl, VERT, FRAG)
    if (!program) return undefined

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'a_pos')
    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uIntensity = gl.getUniformLocation(program, 'u_intensity')
    const uReach = gl.getUniformLocation(program, 'u_reach')

    gl.useProgram(program)
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let raf = 0
    let start = performance.now()
    let mouse = { x: 0.75, y: 0.45 }
    let target = { x: 0.75, y: 0.45 }
    let visible = !document.hidden
    let onScreen = true
    let ready = false
    let drawn = false

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      // The canvas is CSS-blurred, so a retina buffer only multiplies the shader cost.
      const dpr = window.matchMedia('(pointer: coarse)').matches ? 0.6 : 1
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
      drawn = false
    }

    const onMove = (e) => {
      if (!interactive) return
      const r = canvas.getBoundingClientRect()
      if (!r.width || !r.height) return
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
    }

    const onVis = () => {
      visible = !document.hidden
      ensure()
    }

    const shouldRun = () => visible && onScreen

    const tick = (now) => {
      if (!shouldRun()) {
        raf = 0
        return
      }
      // Reduced motion or paused: hold one still frame
      const frozen = reduce.matches || isMotionPaused()
      if (frozen && drawn) {
        raf = 0
        return
      }
      drawn = true
      raf = frozen ? 0 : requestAnimationFrame(tick)

      mouse.x += (target.x - mouse.x) * 0.05
      mouse.y += (target.y - mouse.y) * 0.05

      const t = (now - start) / 1000
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uIntensity, 1)
      gl.uniform1f(uReach, reach)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (!ready) {
        ready = true
        canvas.classList.add('is-ready')
      }
    }

    const ensure = () => {
      if (shouldRun() && !raf) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      ensure()
    }, { rootMargin: '120px 0px' })

    resize()
    io.observe(canvas)
    const onResize = () => {
      resize()
      ensure()
    }
    window.addEventListener('resize', onResize)
    if (interactive) window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    const unsub = subscribeMotion(ensure)
    reduce.addEventListener('change', ensure)
    ensure()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      unsub()
      reduce.removeEventListener('change', ensure)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      gl.deleteProgram(program)
      gl.deleteBuffer(buf)
    }
  }, [interactive, reach])

  return (
    <canvas
      ref={canvasRef}
      className={`breathing-field breathing-field--lit ${className}`.trim()}
      aria-hidden="true"
    />
  )
}
