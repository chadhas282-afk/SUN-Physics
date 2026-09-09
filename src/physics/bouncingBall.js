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