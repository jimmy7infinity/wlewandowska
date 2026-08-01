import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';
import { computeMetaballScrollTarget, METABALL_SCROLL_STOPS } from '../data/metaballStops';

function parseHexColor(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

/** Browsers often resolve custom properties to `rgb()` / `rgba()` — shaders still need 0–1 RGB. */
function parseCssColorToRgb01(input) {
  if (!input) return [1, 1, 1];
  const s = input.trim();
  if (s.startsWith('#')) {
    return parseHexColor(s);
  }
  let m = s.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
  if (m) {
    return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
  }
  m = s.match(/^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i);
  if (m) {
    return [Number(m[1]) / 255, Number(m[2]) / 255, Number(m[3]) / 255];
  }
  return [1, 1, 1];
}

function fract(x) {
  return x - Math.floor(x);
}

function hash31(p) {
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);
  const r_yzx = [r[1], r[2], r[0]];
  const dotVal = r[0] * (r_yzx[0] + 33.33) + r[1] * (r_yzx[1] + 33.33) + r[2] * (r_yzx[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    r[i] = fract(r[i] + dotVal);
  }
  return r;
}

function hash33(v) {
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);
  const p_yxz = [p[1], p[0], p[2]];
  const dotVal = p[0] * (p_yxz[0] + 33.33) + p[1] * (p_yxz[1] + 33.33) + p[2] * (p_yxz[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    p[i] = fract(p[i] + dotVal);
  }
  const p_xxy = [p[0], p[0], p[1]];
  const p_yxx = [p[1], p[0], p[0]];
  const p_zyx = [p[2], p[1], p[0]];
  const result = [];
  for (let i = 0; i < 3; i++) {
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);
  }
  return result;
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
const float PI = 3.14159265359;

float getMetaBallValue(vec2 c, float r, vec2 p) {
  vec2 d = p - c;
  // Cap singularity at ball centers — Safari otherwise shows bright dots.
  float dist2 = max(dot(d, d), 1e-3);
  return (r * r) / dist2;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float scale = iAnimationSize / iResolution.y;
  vec2 coord = (fc - iResolution.xy * 0.5) * scale;
  vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
  float m1 = 0.0;
  for (int i = 0; i < 50; i++) {
    if (i >= iBallCount) break;
    m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
  }
  float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
  float total = m1 + m2;
  // Fixed-width edge AA (avoid fwidth — Safari often draws hard outlines/halos).
  float f = smoothstep(1.12, 1.48, total);
  vec3 cFinal = vec3(0.0);
  if (total > 0.0) {
    float alpha1 = m1 / total;
    float alpha2 = m2 / total;
    cFinal = iColor * alpha1 + iCursorColor * alpha2;
  }
  if (enableTransparency) {
    // Premultiplied alpha for correct Safari/WebKit compositing (no dark outlines).
    outColor = vec4(cFinal * f, f);
  } else {
    outColor = vec4(cFinal * f, 1.0);
  }
}
`;

const MetaBalls = ({
  color = '#ffffff',
  speed = 0.3,
  enableMouseInteraction = true,
  hoverSmoothness = 0.08,
  animationSize = 30,
  ballCount = 15,
  clumpFactor = 1,
  cursorBallSize = 3,
  cursorBallColor = '#ffffff',
  enableTransparency = false,
  groupOffsetX = 0,
  groupOffsetY = 0,
  mouseClusterAnchorX = 0.75,
  mouseClusterAnchorY = 0.65,
  mouseProximityRadius = 280,
  useScrollAnchors = false,
  scrollLerpWeight = 0.055
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stops = useScrollAnchors ? METABALL_SCROLL_STOPS : null;

    const dpr = 1;
    // Premultiplied alpha matches fragment output and avoids Safari edge fringing.
    const renderer = new Renderer({
      dpr,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, {
      left: -1,
      right: 1,
      top: 1,
      bottom: -1,
      near: 0.1,
      far: 10
    });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const [r1, g1, b1] = parseCssColorToRgb01(color);
    const [r2, g2, b2] = parseCssColorToRgb01(cursorBallColor);

    const metaBallsUniform = [];
    for (let i = 0; i < 50; i++) {
      metaBallsUniform.push(new Vec3(0, 0, 0));
    }

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: ballCount },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const maxBalls = 50;
    const effectiveBallCount = Math.min(ballCount, maxBalls);
    const ballParams = [];
    for (let i = 0; i < effectiveBallCount; i++) {
      const idx = i + 1;
      const h1 = hash31(idx);
      const st = h1[0] * (2 * Math.PI);
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);
      const h2 = hash33(h1);
      const toggle = Math.floor(h2[0] * 2.0);
      const radiusVal = 0.5 + h2[2] * (2.0 - 0.5);
      ballParams.push({ st, dtFactor, baseScale, toggle, radius: radiusVal });
    }

    const firstStop = stops?.[0];
    const live = {
      anchorX: firstStop ? firstStop.clusterAnchorX : mouseClusterAnchorX,
      anchorY: firstStop ? firstStop.clusterAnchorY : mouseClusterAnchorY,
      groupOffsetX: firstStop ? firstStop.groupOffsetX : groupOffsetX,
      groupOffsetY: firstStop ? firstStop.groupOffsetY : groupOffsetY
    };

    const mouseBallPos = { x: 0, y: 0 };
    let pointerNear = false;
    let pointerX = 0;
    let pointerY = 0;

    function resize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + 'px';
      gl.canvas.style.height = height + 'px';
      gl.canvas.style.display = 'block';
      gl.canvas.style.outline = 'none';
      gl.canvas.style.border = 'none';
      gl.canvas.style.boxShadow = 'none';
      gl.canvas.style.background = 'transparent';
      gl.canvas.style.webkitTapHighlightColor = 'transparent';
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    mouseBallPos.x = live.anchorX * gl.canvas.width;
    mouseBallPos.y = (1 - live.anchorY) * gl.canvas.height;

    function onWindowPointerMove(e) {
      if (!enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      const hotspotX = rect.left + live.anchorX * rect.width;
      const hotspotY = rect.top + live.anchorY * rect.height;
      const dx = e.clientX - hotspotX;
      const dy = e.clientY - hotspotY;
      pointerNear = dx * dx + dy * dy <= mouseProximityRadius * mouseProximityRadius;
      if (pointerNear) {
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        pointerX = (px / rect.width) * gl.canvas.width;
        pointerY = (1 - py / rect.height) * gl.canvas.height;
      }
    }
    window.addEventListener('pointermove', onWindowPointerMove, { passive: true });

    const startTime = performance.now();
    let animationFrameId;
    function update(t) {
      animationFrameId = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      if (stops?.length) {
        const tgt = computeMetaballScrollTarget(stops, window.scrollY, window.innerHeight);
        if (tgt) {
          const k = scrollLerpWeight;
          live.anchorX += (tgt.clusterAnchorX - live.anchorX) * k;
          live.anchorY += (tgt.clusterAnchorY - live.anchorY) * k;
          live.groupOffsetX += (tgt.groupOffsetX - live.groupOffsetX) * k;
          live.groupOffsetY += (tgt.groupOffsetY - live.groupOffsetY) * k;
        }
      } else {
        live.anchorX = mouseClusterAnchorX;
        live.anchorY = mouseClusterAnchorY;
        live.groupOffsetX = groupOffsetX;
        live.groupOffsetY = groupOffsetY;
      }

      const sc = animationSize / gl.canvas.height;
      const groupOffX = live.groupOffsetX * (gl.canvas.width * 0.5) * sc;
      const groupOffY = live.groupOffsetY * (gl.canvas.height * 0.5) * sc;

      for (let i = 0; i < effectiveBallCount; i++) {
        const p = ballParams[i];
        const dt = elapsed * speed * p.dtFactor;
        const th = p.st + dt;
        const x = Math.cos(th);
        const y = Math.sin(th + dt * p.toggle);
        const posX = x * p.baseScale * clumpFactor + groupOffX;
        const posY = y * p.baseScale * clumpFactor + groupOffY;
        metaBallsUniform[i].set(posX, posY, p.radius);
      }

      let targetX, targetY;
      if (pointerNear) {
        targetX = pointerX;
        targetY = pointerY;
      } else {
        const cx = live.anchorX * gl.canvas.width;
        const cy = (1 - live.anchorY) * gl.canvas.height;
        const rx = gl.canvas.width * 0.055;
        const ry = gl.canvas.height * 0.048;
        targetX = cx + Math.cos(elapsed * speed) * rx;
        targetY = cy + Math.sin(elapsed * speed) * ry;
      }
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);

      renderer.render({ scene, camera });
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onWindowPointerMove);
      container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    color,
    cursorBallColor,
    speed,
    enableMouseInteraction,
    hoverSmoothness,
    animationSize,
    ballCount,
    clumpFactor,
    cursorBallSize,
    enableTransparency,
    groupOffsetX,
    groupOffsetY,
    mouseClusterAnchorX,
    mouseClusterAnchorY,
    mouseProximityRadius,
    useScrollAnchors,
    scrollLerpWeight
  ]);

  return <div ref={containerRef} className="w-full h-full relative" />;
};

export default MetaBalls;
