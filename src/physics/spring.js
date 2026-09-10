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
  function step(currentTime) {
    let t = (currentTime - startTime) / 1000;
    let pos = distance * Math.exp(-c * t) * Math.cos(w * t);
    element.style.transform = \`translateX(\${pos}px)\`;
    if (Math.abs(pos) > 0.5) requestAnimationFrame(step);
    else element.style.transform = \`translateX(0px)\`;
  }
  requestAnimationFrame(step);
}`;
  return {
    model: `Damped Harmonic Oscillator.\nx(t) = A * e^(-c*t) * cos(ω*t)\nc=${c.toFixed(2)}, ω=${w.toFixed(2)}`,
    breakdown: points.filter((_,i) => i%5 === 0), totalTime: boundedTime, cssCode, jsCode,
    runner: (element) => {
      let startTime = performance.now(); let anim;
      function step(currentTime) {
        let t = (currentTime - startTime) / 1000;
        let pos = distance * Math.exp(-c * t) * Math.cos(w * t);
        element.style.transform = `translateX(${pos}px)`;
        if (Math.abs(pos) > 0.5) anim = requestAnimationFrame(step);
        else element.style.transform = `translateX(0px)`;