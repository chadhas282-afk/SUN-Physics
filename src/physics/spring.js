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