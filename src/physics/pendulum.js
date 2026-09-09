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
    keyframes.push(`  ${percent.toFixed(2)}% { transform: rotate(${theta.toFixed(2)}deg); }`);
  }
  const cssCode = `@keyframes pendulumSwing {\n${keyframes.join('\n')}\n}`;
  const jsCode = `function animatePendulum(element) {
  let startTime = performance.now();
  let w = ${w}; let initialAngle = ${angle};
  function step(currentTime) {
    let t = (currentTime - startTime) / 1000;
    let theta = initialAngle * Math.cos(w * t);
    element.style.transform = \`rotate(\${theta}deg)\`;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}`;
  return {
    model: `Simple Pendulum (Small Angle).`, breakdown: points.filter((_,i) => i%5 === 0), totalTime, cssCode, jsCode,
    runner: (element) => {
      let startTime = performance.now(); let anim;
      function step(currentTime) {
        let t = (currentTime - startTime) / 1000;
        let theta = angle * Math.cos(w * t);
        element.style.transform = `rotate(${theta}deg)`;
        anim = requestAnimationFrame(step);
      }
      anim = requestAnimationFrame(step);
      return () => cancelAnimationFrame(anim);
    },
    fidelity: "~90% accurate."
  };
}