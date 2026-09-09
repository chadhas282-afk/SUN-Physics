export function calculateBouncingBall(params) {
  const { height = 400, gravity = 9.8, restitution = 0.7 } = params;
  const g = gravity * 100;
  let bounces = [];
  let t_fall = Math.sqrt((2 * height) / g);
  let time = t_fall;
  let impactVelocity = Math.sqrt(2 * g * height);
  bounces.push({ time: time, peakHeight: height, peakTime: 0 });
  const MIN_BOUNCE_HEIGHT = 1;
  let e = restitution;
  let v = impactVelocity * e;
  while (true) {
    let h = (v * v) / (2 * g);
    if (h < MIN_BOUNCE_HEIGHT) break;
    let t_up = v / g;
    let t_down = t_up;
    bounces.push({ peakTime: time + t_up, peakHeight: h, time: time + t_up + t_down });
    time += t_up + t_down;
    v = v * e;
  }
  const totalTime = time;
  let keyframes = [];
  keyframes.push(`  0% { transform: translateY(0px); animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53); }`);
  bounces.forEach((bounce, i) => {
    let impactPercent = (bounce.time / totalTime) * 100;
    keyframes.push(`  ${impactPercent.toFixed(2)}% { transform: translateY(${height.toFixed(2)}px); animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }`);
    if (i < bounces.length - 1) {
      let next = bounces[i + 1];
      let peakPercent = (next.peakTime / totalTime) * 100;
      let peakY = height - next.peakHeight;
      keyframes.push(`  ${peakPercent.toFixed(2)}% { transform: translateY(${peakY.toFixed(2)}px); animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53); }`);
    }
  });
  if (keyframes.length > 0 && !keyframes[keyframes.length - 1].startsWith("  100.00%")) {
    keyframes.push(`  100% { transform: translateY(${height}px); }`);
  }
  const cssCode = `@keyframes bouncingBall {\n${keyframes.join('\n')}\n}`;
  const jsCode = `function animateBouncingBall(element) {
  let startTime = performance.now();
  let g = ${g};
   let height = ${height};
  let e = ${e};
  let currentVelocity = 0;
  let currentY = 0;
  let lastTime = startTime;
  function step(currentTime) {
    let dt = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    currentVelocity += g * dt;
    currentY += currentVelocity * dt;
    if (currentY >= height) {
      currentY = height;
      currentVelocity = -currentVelocity * e;
      if (Math.abs(currentVelocity) < 10) currentVelocity = 0;
    }
    element.style.transform = \`translateY(\${currentY}px)\`;
    if (Math.abs(currentVelocity) > 0 || currentY < height) {
      requestAnimationFrame(step);
    }
  }
    requestAnimationFrame(step);
}`;
  return {
    model: `Projectile motion with inelastic collisions.\nGravity: ${g.toFixed(0)} px/s², Restitution: ${e}`,
    breakdown: bounces, totalTime, cssCode, jsCode,
    runner: (element) => {
      let startTime = performance.now();
      let currentVelocity = 0; let currentY = 0; let lastTime = startTime; let anim;
      function step(currentTime) {
        let dt = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        currentVelocity += g * dt; currentY += currentVelocity * dt;
        if (currentY >= height) {
          currentY = height; currentVelocity = -currentVelocity * e;
          if (Math.abs(currentVelocity) < 10) currentVelocity = 0;
        }
        element.style.transform = `translateY(${currentY}px)`;
        if (Math.abs(currentVelocity) > 0 || currentY < height) anim = requestAnimationFrame(step);
      }
      anim = requestAnimationFrame(step);