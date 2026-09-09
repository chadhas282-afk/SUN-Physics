export function calculateOrbital(params) {
  const { starMass = 10000, initialVelocity = 50, distance = 150 } = params;
  const GM = starMass; 
  let x = distance; let y = 0; let vx = 0; let vy = initialVelocity;
  const dt = 0.05; let t = 0; let keyframes = []; let points = [];
  const maxTime = 20; let previousY = y; let positions = [];
  while (t <= maxTime) {
    let r = Math.sqrt(x*x + y*y);
    let a = -GM / (r*r);
    vx += (a * (x / r)) * dt; vy += (a * (y / r)) * dt;
    x += vx * dt; y += vy * dt; t += dt;
    positions.push({ t, x, y });
    if (x > 0 && previousY < 0 && y >= 0) break;
    previousY = y;
    if (r > 2000) break;