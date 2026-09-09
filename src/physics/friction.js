export function calculateFriction(params) {
  const { initialVelocity = 200, frictionCoefficient = 0.3, gravity = 9.8 } = params;
  const v0 = initialVelocity; const mu = frictionCoefficient; const g = gravity * 100;
  const a = -(mu * g);
  const totalTime = -v0 / a;
  const distance = (v0 * totalTime) + (0.5 * a * totalTime * totalTime);
  let keyframes = []; let points = [];
  keyframes.push(`  0% { transform: translateX(0px); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }`);
  keyframes.push(`  100% { transform: translateX(${distance.toFixed(2)}px); }`);
  for(let i=0; i<=10; i++) {
    let t = (i / 10) * totalTime;
    points.push({time: t, pos: (v0 * t) + (0.5 * a * t * t)});
  }
  const cssCode = `@keyframes slidingFriction {\n${keyframes.join('\n')}\n}`;
  const jsCode = `function animateFriction(element) {
  let startTime = performance.now();
  let v0 = ${v0}; let a = ${a}; let totalT = ${totalTime};
  function step(currentTime) {
    let t = (currentTime - startTime) / 1000;
    if (t > totalT) t = totalT;
    let x = (v0 * t) + (0.5 * a * t * t);
    element.style.transform = \`translateX(\${x}px)\`;
    if (t < totalT) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}`;
  return {
    model: `Kinetic Friction.`, breakdown: points, totalTime, cssCode, jsCode,
    runner: (element) => {
      let startTime = performance.now(); let anim;