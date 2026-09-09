export function calculateFluidDrag(params) {
  const { mass = 1, dragCoefficient = 5, gravity = 9.8 } = params;
  const m = mass; const b = dragCoefficient; const g = gravity * 100;
  const v_terminal = (m * g) / b;
  const dropDistance = 400; 
  let t = 0; let dt = 0.05; let y = 0; let points = []; let positions = [];
  while (y < dropDistance) {
    let v = v_terminal * (1 - Math.exp(-(b * t) / m));
    y += v * dt; t += dt; positions.push({ t, y, v });
  }
  const totalTime = t;
  let keyframes = []; const numSamples = 40;
  for(let i=0; i<=numSamples; i++) {
    let targetT = (i / numSamples) * totalTime;
    let closest = positions.reduce((prev, curr) => Math.abs(curr.t - targetT) < Math.abs(prev.t - targetT) ? curr : prev);
    let percent = (i / numSamples) * 100;