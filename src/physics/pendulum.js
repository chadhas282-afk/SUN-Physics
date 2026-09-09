export function calculatePendulum(params) {
  const { length = 200, gravity = 9.8, angle = 45, duration = 3000 } = params;
  const g = gravity * 100; const L = length; const w = Math.sqrt(g / L);
  const totalTime = duration / 1000; 
  let keyframes = []; let points = []; const numSteps = 50; 
  for(let i=0; i<=numSteps; i++) {
    let t = (i / numSteps) * totalTime;
    let theta = angle * Math.cos(w * t);
    points.push({time: t, angle: theta});
    let percent = (i / numSteps) * 100;