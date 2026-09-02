import { useEffect, useRef, useState } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

/* Kota fluid river - vertical paint streams, Shift purple palette */
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;

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
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p;
    a *= 0.5;
  }
  return v;
}

// One flowing ribbon - distance to a warped vertical curve
float ribbon(vec2 p, float x0, float w, float t, float phase) {
  float bend = sin(p.y * 1.8 + t * 0.7 + phase) * 0.16
             + sin(p.y * 3.6 - t * 1.1 + phase * 1.7) * 0.07;
  float warp = (fbm(vec2(p.x * 1.2 + phase, p.y * 1.1 - t * 0.45)) - 0.5) * 0.28;
  float d = abs(p.x - x0 - bend - warp);
  return smoothstep(w, 0.0, d);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
  vec2 m = vec2((u_mouse.x - 0.5) * aspect, u_mouse.y - 0.5);

  float t = u_time * 0.25;
  // Anchor river in the canvas (canvas already sits on the right via CSS)
  p.x -= 0.05 + m.x * 0.06;
  p.y -= m.y * 0.04;

  // Vertical paint streams
  float r1 = ribbon(p, 0.00, 0.38, t, 0.0);
  float r2 = ribbon(p, 0.2, 0.26, t, 2.1);
  float r3 = ribbon(p, -0.18, 0.24, t, 4.0);
  float r4 = ribbon(p, 0.36, 0.16, t, 1.3);

  float flow = fbm(vec2(p.x * 2.0, p.y * 3.2 - t * 1.2));
  float flow2 = fbm(vec2(p.x * 3.5 + 2.0, p.y * 5.0 - t * 1.8));

  r1 *= 0.7 + flow * 0.55;
  r2 *= 0.6 + flow2 * 0.6;
  r3 *= 0.55 + flow * 0.5;
  r4 *= 0.5 + flow2 * 0.55;

  float veil = smoothstep(-0.85, -0.05, p.y) * smoothstep(0.9, 0.0, p.y);

  vec3 cDeep = vec3(0.35, 0.12, 0.78);
  vec3 cPurple = vec3(0.72, 0.38, 1.0);
  vec3 cLilac = vec3(0.88, 0.68, 1.0);
  vec3 cMag = vec3(1.0, 0.32, 0.62);
  vec3 cCool = vec3(0.38, 0.48, 1.0);
  vec3 cSoft = vec3(0.95, 0.85, 1.0);

  vec3 col = vec3(0.0);
  col += cDeep * r1 * 1.15;
  col += cPurple * r1 * (0.5 + flow * 0.5);
  col += cMag * r2 * 1.15;
  col += cCool * r3 * 1.0;
  col += cLilac * r4 * 1.05;
  col += cSoft * r1 * r2 * 0.4;

  float body = (r1 * 1.15 + r2 * 0.95 + r3 * 0.8 + r4 * 0.65) * veil * u_intensity;
  float alpha = clamp(body, 0.0, 0.98);

  col = mix(col, col * 1.2, clamp(body, 0.0, 1.0));

  float grain = (hash(gl_FragCoord.xy + floor(t * 8.0)) - 0.5) * 0.03;
  col += grain;

  gl_FragColor = vec4(col, alpha);
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
export default function BreathingField({ className = '', interactive = true }) {
  const canvasRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduce.matches)
    update()
    fine.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
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
    let ready = false

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
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
    }

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return

      mouse.x += (target.x - mouse.x) * 0.05
      mouse.y += (target.y - mouse.y) * 0.05

      const t = (now - start) / 1000
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uIntensity, 1)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (!ready) {
        ready = true
        canvas.classList.add('is-ready')
      }
    }

    resize()
    window.addEventListener('resize', resize)
    if (interactive) window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVis)
      gl.deleteProgram(program)
      gl.deleteBuffer(buf)
    }
  }, [enabled, interactive])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className={`breathing-field ${className}`.trim()}
      aria-hidden="true"
    />
  )
}
