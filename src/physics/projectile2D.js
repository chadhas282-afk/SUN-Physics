export function calculateProjectile2D(params) {
  const { velocityX = 50, velocityY = 100, gravity = 9.8 } = params;
  const vx = velocityX * 10; const vy0 = velocityY * 10; const g = gravity * 100;
  const totalTime = 2 * (vy0 / g);
  let keyframes = []; let points = []; const numSteps = 50; 
  for(let i=0; i<=numSteps; i++) {
    let t = (i / numSteps) * totalTime;
    let x = vx * t; let y = (vy0 * t) - (0.5 * g * t * t);
    points.push({time: t, pos: x, peakHeight: y});
    let percent = (i / numSteps) * 100;
    keyframes.push(`  ${percent.toFixed(2)}% { transform: translate(${x.toFixed(2)}px, ${-y.toFixed(2)}px); }`);
  }
  const cssCode = `@keyframes projectileMotion {\n${keyframes.join('\n')}\n}`;
  const jsCode = `function animateProjectile(element) {
  let startTime = performance.now();
  let vx = ${vx}; let vy0 = ${vy0}; let g = ${g};
  function step(currentTime) {
    let t = (currentTime - startTime) / 1000;
    let x = vx * t; let y = (vy0 * t) - (0.5 * g * t * t);
    element.style.transform = \`translate(\${x}px, \${-y}px)\`;