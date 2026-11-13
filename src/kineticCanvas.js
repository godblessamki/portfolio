/**
 * Pure HTML5 2D Canvas kinetic field & telemetry wave renderer.
 * Respects prefers-reduced-motion and supports interactive domain mode switching.
 */

export function createKineticCanvas(canvas, onStateChange) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let mode = 'ios';
  let paused = prefersReduced;
  let rafId = 0;
  let time = 0;
  let pointer = { x: 0.5, y: 0.5, active: false };

  const nodes = Array.from({ length: 24 }, (_, idx) => ({
    bx: ((idx % 6) + 0.5) / 6,
    by: (Math.floor(idx / 6) + 0.5) / 4,
    phase: idx * 0.65,
    radius: idx % 4 === 0 ? 3.2 : 2,
  }));

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawFrame();
  }

  function getPalette() {
    if (mode === 'distributed') {
      return { primary: '#4D38F5', secondary: '#8A5CFF', accent: '#4EE0FF' };
    }
    if (mode === 'telemetry') {
      return { primary: '#4EE0FF', secondary: '#8A5CFF', accent: '#FFFFFF' };
    }
    return { primary: '#8A5CFF', secondary: '#4EE0FF', accent: '#CFBDFF' };
  }

  function drawFrame() {
    if (!width || !height) return;
    const palette = getPalette();

    ctx.clearRect(0, 0, width, height);

    // Subtle radial backdrop aura
    const cx = pointer.active ? pointer.x * width : width * 0.58;
    const cy = pointer.active ? pointer.y * height : height * 0.44;
    const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.65);
    glow.addColorStop(0, 'rgba(138, 92, 255, 0.22)');
    glow.addColorStop(0.45, 'rgba(77, 56, 245, 0.08)');
    glow.addColorStop(1, 'rgba(9, 10, 15, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // Fine coordinate grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
    ctx.lineWidth = 1;
    const stepX = width / 6;
    const stepY = height / 4;
    ctx.beginPath();
    for (let x = stepX; x < width; x += stepX) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = stepY; y < height; y += stepY) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Kinetic harmonic waves
    const waveCount = mode === 'telemetry' ? 3 : 2;
    for (let w = 0; w < waveCount; w++) {
      ctx.beginPath();
      const amp = (height * (0.11 - w * 0.025)) * (mode === 'telemetry' ? 1.2 : 0.95);
      const freq = mode === 'distributed' ? 0.018 + w * 0.006 : 0.013 + w * 0.005;
      const baseY = height * (0.48 + (w - 0.5) * 0.14);

      for (let x = 0; x <= width; x += 6) {
        const pull = pointer.active ? Math.sin((x / width - pointer.x) * Math.PI) * 14 : 0;
        const y =
          baseY +
          Math.sin(x * freq + time * (1.25 + w * 0.35) + w) * amp +
          Math.cos(x * freq * 0.5 - time * 0.8) * (amp * 0.35) +
          pull;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = w === 0 ? palette.primary : w === 1 ? palette.secondary : palette.accent;
      ctx.globalAlpha = w === 0 ? 0.85 : 0.45;
      ctx.lineWidth = w === 0 ? 2 : 1.25;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Interactive lattice nodes
    const computed = nodes.map((node) => {
      const ox = Math.sin(time * 0.9 + node.phase) * 10;
      const oy = Math.cos(time * 0.75 + node.phase) * 8;
      return {
        x: node.bx * width + ox,
        y: node.by * height + oy,
        radius: node.radius,
      };
    });

    // Connect nearby nodes in distributed/iOS views
    ctx.strokeStyle = 'rgba(207, 189, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let i = 0; i < computed.length; i++) {
      for (let j = i + 1; j < computed.length; j++) {
        const dx = computed[i].x - computed[j].x;
        const dy = computed[i].y - computed[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < Math.min(width, height) * 0.34) {
          ctx.beginPath();
          ctx.moveTo(computed[i].x, computed[i].y);
          ctx.lineTo(computed[j].x, computed[j].y);
          ctx.stroke();
        }
      }
    }

    for (const pt of computed) {
      const distToPointer = pointer.active
        ? Math.hypot(pt.x - pointer.x * width, pt.y - pointer.y * height)
        : 999;
      const near = distToPointer < 90;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, near ? pt.radius + 1.5 : pt.radius, 0, Math.PI * 2);
      ctx.fillStyle = near ? palette.accent : 'rgba(227, 225, 233, 0.55)';
      ctx.fill();
    }
  }

  function tick() {
    if (!paused) {
      time += 0.022;
      drawFrame();
      rafId = window.requestAnimationFrame(tick);
    }
  }

  function start() {
    window.cancelAnimationFrame(rafId);
    if (!paused) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      drawFrame();
    }
  }

  function setMode(nextMode) {
    mode = nextMode;
    drawFrame();
  }

  function togglePaused() {
    paused = !paused;
    if (onStateChange) onStateChange(paused);
    start();
    return paused;
  }

  function handlePointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      active: true,
    };
    if (paused) drawFrame();
  }

  function handlePointerLeave() {
    pointer.active = false;
    if (paused) drawFrame();
  }

  canvas.addEventListener('pointermove', handlePointerMove);
  canvas.addEventListener('pointerleave', handlePointerLeave);

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(canvas);
  window.addEventListener('resize', resize);

  resize();
  if (onStateChange) onStateChange(paused);
  start();

  return {
    setMode,
    togglePaused,
    isPaused: () => paused,
    destroy() {
      window.cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', resize);
      if (ro) ro.disconnect();
    },
  };
}
