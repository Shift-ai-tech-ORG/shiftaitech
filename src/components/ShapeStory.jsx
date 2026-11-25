import { useEffect, useRef, useState } from 'react'
import { isMotionPaused, subscribeMotion } from '../lib/motion'

/* The statement section's stage: one satin object that starts as the hero's liquid
   and takes a new shape for each paragraph as the section scrolls.
   Raymarched in one fragment shader, drawn only inside its own framed box. */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_w[4];    // molten, box, torus, octahedron
uniform mat3 u_rot;

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - 0.035;
}
float sdTorus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}
float sdOcta(vec3 p, float s) {
  p = abs(p);
  return (p.x + p.y + p.z - s) * 0.57735 - 0.018;
}

float map(vec3 p) {
  float t = u_time;
  p = u_rot * p / (1.0 + sin(t * 0.7) * 0.035);
  float n = sin(p.x * 3.1 + t * 0.9) * sin(p.y * 3.4 + t * 0.7) * sin(p.z * 2.9 + t * 1.1)
          + 0.5 * sin(p.x * 6.3 - t * 1.3) * sin(p.y * 5.7 + t) * sin(p.z * 6.1);
  float d = n * 0.012 * (1.0 - u_w[0]);
  if (u_w[0] > 0.001) d += u_w[0] * (length(p) - 0.56 + n * 0.2);
  if (u_w[1] > 0.001) d += u_w[1] * sdBox(p, vec3(0.42));
  if (u_w[2] > 0.001) d += u_w[2] * sdTorus(p, vec2(0.46, 0.17));
  if (u_w[3] > 0.001) d += u_w[3] * sdOcta(p, 0.78);
  return d;
}

void main() {
  vec2 sp = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  vec3 ro = vec3(0.0, 0.0, 3.2);
  vec3 rd = normalize(vec3(sp, -1.45));

  float b = dot(ro, rd);
  float disc = b * b - (dot(ro, ro) - 1.1);
  vec4 outc = vec4(0.0);

  if (disc > 0.0) {
    float sq = sqrt(disc);
    float t = max(-b - sq, 0.0);
    float tMax = -b + sq;
    bool hit = false;
    for (int i = 0; i < 80; i++) {
      float d = map(ro + rd * t);
      if (d < 0.0007) { hit = true; break; }
      t += d * 0.7;
      if (t > tMax) break;
    }
    if (hit) {
      vec3 p = ro + rd * t;
      vec2 e = vec2(0.003, -0.003);
      vec3 n = normalize(
        e.xyy * map(p + e.xyy) + e.yyx * map(p + e.yyx) +
        e.yxy * map(p + e.yxy) + e.xxx * map(p + e.xxx));

      // Ambient occlusion: darkens creases and the inside of the ring
      float ao = 0.0;
      float sca = 1.0;
      for (int k = 1; k <= 5; k++) {
        float hh = 0.03 * float(k);
        ao += (hh - map(p + n * hh)) * sca;
        sca *= 0.7;
      }
      ao = clamp(1.0 - 2.2 * ao, 0.0, 1.0);

      // Soft self-shadow from the key light
      vec3 key = normalize(vec3(0.9 + u_mouse.x * 1.4, 1.5 + u_mouse.y * 1.0, 1.5) - p);
      float sh = 1.0;
      float st = 0.03;
      for (int k = 0; k < 18; k++) {
        float hd = map(p + key * st);
        sh = min(sh, 10.0 * hd / st);
        st += clamp(hd, 0.02, 0.12);
        if (hd < 0.001 || st > 1.4) break;
      }
      sh = clamp(sh, 0.0, 1.0);

      // Polished satin in the site palette: clear form, two crisp highlights, one purple rim
      float diff = max(dot(n, key), 0.0) * sh;
      float wrap = dot(n, key) * 0.5 + 0.5;
      vec3 h = normalize(key - rd);
      float ndh = max(dot(n, h), 0.0);
      float specWide = pow(ndh, 24.0) * sh;
      float specTight = pow(ndh, 160.0) * sh;
      float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      vec3 fill = normalize(vec3(-0.7, -0.45, 0.35));
      float under = max(dot(n, fill), 0.0);
      vec3 r = reflect(rd, n);
      float strip = smoothstep(0.55, 0.9, r.y) * smoothstep(-0.2, 0.5, r.x);  // soft overhead light panel

      vec3 base = vec3(0.085, 0.082, 0.1);
      vec3 violet = vec3(0.486, 0.227, 0.929);        // #7c3aed
      vec3 purple = vec3(0.659, 0.333, 0.969);        // #a855f7
      vec3 lilac = vec3(0.753, 0.518, 0.988);         // #c084fc
      vec3 col = base * (0.35 + wrap * 0.75) * ao;
      col += vec3(0.2, 0.185, 0.25) * diff;
      col += violet * under * 0.6 * ao;
      col += purple * pow(under, 3.0) * 0.35;
      col += lilac * fres * 0.75 * (0.4 + 0.6 * ao);
      col += vec3(0.82, 0.78, 0.95) * strip * 0.16 * ao;
      col += vec3(0.9, 0.86, 1.0) * specWide * 0.3;
      col += vec3(1.0) * specTight * 0.9;
      col *= 0.82 + 0.3 * smoothstep(-0.7, 0.7, p.y + p.x * 0.4);   // top-right lift across each face
      col = col / (1.0 + col * 0.25);                 // gentle roll-off so highlights stay clean
      col = pow(col, vec3(0.92));
      outc = vec4(col, 1.0);
    }
  }
  gl_FragColor = outc;
}
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s)
    return null
  }
  return s
}

// Scroll progress (0 to 1) at which each shape is fully formed
const STOPS = [0.04, 0.34, 0.62, 0.9]

export default function ShapeStory() {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const [epoch, setEpoch] = useState(0)

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    const section = stage.closest('section')
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true })
    if (!gl || !section) return undefined

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return undefined
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return undefined
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const U = (n) => gl.getUniformLocation(prog, n)
    const uRes = U('u_res'), uTime = U('u_time'), uMouse = U('u_mouse'), uW = U('u_w'), uRot = U('u_rot')

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let quality = Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2)
    let raf = 0
    let last = 0
    let born = performance.now()
    let slow = 0
    let onScreen = false
    let clock = 0 // animation time, stops while paused
    let lastW = 0
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const w = new Float32Array(4)
    const tgt = new Float32Array(4)
    w[0] = 1

    const resize = () => {
      const r = stage.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * quality))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * quality))
      gl.viewport(0, 0, canvas.width, canvas.height)
      lastW = r.width
    }

    const progress = () => {
      const r = section.getBoundingClientRect()
      const vh = window.innerHeight
      const pinned = r.height > vh * 1.5
      const p = pinned ? -r.top / (r.height - vh) : (vh * 0.85 - r.top) / (r.height + vh * 0.35)
      return Math.min(Math.max(p, 0), 1)
    }

    const draw = (dt, still) => {
      const p = progress()
      let i = 0
      while (i < STOPS.length - 2 && p > STOPS[i + 1]) i++
      let t = Math.min(Math.max((p - STOPS[i]) / (STOPS[i + 1] - STOPS[i]), 0), 1)
      // hold each shape, then change quickly: ease in the last 45% of the gap
      t = Math.min(Math.max((t - 0.55) / 0.45, 0), 1)
      t = t * t * (3 - 2 * t)
      tgt.fill(0)
      tgt[i] += 1 - t
      tgt[i + 1] += t

      const step = p < 0.2 ? 0 : p < 0.48 ? 1 : p < 0.76 ? 2 : 3
      if (section.dataset.step !== String(step)) section.dataset.step = String(step)

      const ease = still ? 1 : 1 - Math.exp(-dt * 8)
      for (let j = 0; j < 4; j++) w[j] += (tgt[j] - w[j]) * ease
      mouse.x += (mouse.tx - mouse.x) * ease
      mouse.y += (mouse.ty - mouse.y) * ease

      const ry = clock * 0.2 + p * 5.2 + mouse.x * 0.5
      const rx = 0.44 + Math.sin(clock * 0.17) * 0.1 - mouse.y * 0.35
      const cy = Math.cos(ry), sY = Math.sin(ry), cx = Math.cos(rx), sX = Math.sin(rx)
      const rot = [cy, sX * sY, -cx * sY, 0, cx, sX, sY, -sX * cy, cx * cy]

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, clock)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1fv(uW, w)
      gl.uniformMatrix3fv(uRot, false, rot)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      canvas.classList.add('is-ready')
    }

    const tick = (now) => {
      raf = 0
      if (!onScreen || document.hidden) return
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0.016
      last = now
      const frozen = reduce.matches || isMotionPaused()
      if (!frozen) clock += dt
      // Step resolution down if frames run long (never switch off); ignore the first second
      if (now - born > 1000) {
        slow = dt > 0.05 ? slow + 1 : Math.max(0, slow - 1)
        if (slow > 40 && quality > 0.75) {
          slow = 0
          quality = Math.max(0.75, quality - 0.35)
          resize()
        }
      }
      draw(dt, false)
      raf = requestAnimationFrame(tick)
    }

    const ensure = () => {
      if (!raf && onScreen && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }

    const onMove = (e) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = 0.5 - e.clientY / window.innerHeight
    }
    const onResize = () => {
      if (Math.abs(stage.getBoundingClientRect().width - lastW) > 1) resize()
    }
    const onLost = (e) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onRestored = () => setEpoch((n) => n + 1)

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      ensure()
    }, { rootMargin: '100px 0px' })

    resize()
    io.observe(stage)
    const ro = new ResizeObserver(onResize)
    ro.observe(stage)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', ensure)
    canvas.addEventListener('webglcontextlost', onLost)
    canvas.addEventListener('webglcontextrestored', onRestored)
    const unsub = subscribeMotion(ensure)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      unsub()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', ensure)
      canvas.removeEventListener('webglcontextlost', onLost)
      canvas.removeEventListener('webglcontextrestored', onRestored)
      if (section) delete section.dataset.step
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    }
  }, [epoch])

  return (
    <div className="shape-stage" ref={stageRef}>
      <canvas key={epoch} ref={canvasRef} className="shape-stage-canvas" aria-hidden="true" />
    </div>
  )
}
