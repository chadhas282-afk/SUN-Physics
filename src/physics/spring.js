export function calculateSpring(params) {
  const { mass = 1, stiffness = 100, damping = 10, distance = 200 } = params;
  const k = stiffness; const m = mass; const c = damping / (2 * m);
  let w_sq = k / m - c * c;
  if (w_sq <= 0) w_sq = 0.001;
  const w = Math.sqrt(w_sq);
  const totalTime = Math.log(Math.abs(distance) || 1) / (c || 0.1);
  const boundedTime = Math.min(totalTime, 10);
  let keyframes = []; let points = []; const numSteps = 50; 
  for(let i=0; i<=numSteps; i++) {
    let t = (i / numSteps) * boundedTime;
    let pos = distance * Math.exp(-c * t) * Math.cos(w * t);
    points.push({time: t, pos});
    let percent = (i / numSteps) * 100;
    keyframes.push(`  ${percent.toFixed(2)}% { transform: translateX(${pos.toFixed(2)}px); }`);
  }
  const cssCode = `@keyframes springOscillation {\n${keyframes.join('\n')}\n}`;
  const jsCode = `function animateSpring(element) {
  let startTime = performance.now();
  let c = ${c}; let w = ${w}; let distance = ${distance};