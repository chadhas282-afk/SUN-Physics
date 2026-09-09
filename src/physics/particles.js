
export function calculateParticles(params) {
  const { particleCount = 20, explosionForce = 150, gravity = 9.8 } = params;
  
  const g = gravity * 100; 
  const totalTime = 3; 
  const numSteps = 40; 
  
  let keyframes = [];
  
  let particles = [];
  for (let i = 0; i < particleCount; i++) {
    let angle = Math.random() * 2 * Math.PI;
    let speed = (Math.random() * 0.5 + 0.5) * explosionForce;
    let colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
     let color = colors[Math.floor(Math.random() * colors.length)];
    
    particles.push({
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: color
    });
  }
  
  for (let step = 0; step <= numSteps; step++) {
    let t = (step / numSteps) * totalTime;
    let shadows = [];
    
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      let x = p.vx * t;
      let y = (p.vy * t) + (0.5 * g * t * t);
      shadows.push(`${x.toFixed(2)}px ${y.toFixed(2)}px 0 2px ${p.color}`);
    }
    
    let percent = (step / numSteps) * 100;
    keyframes.push(`  ${percent.toFixed(2)}% { box-shadow: ${shadows.join(', ')}; }`);
  }
  
  const cssCode = `@keyframes particleExplosion {\n${keyframes.join('\n')}\n}`;
  
  const jsCode = `function animateParticles(element) {
  let startTime = performance.now();
  let g = ${g};
  let jsParticles = ${JSON.stringify(particles)};
   
  function step(currentTime) {
    let t = (currentTime - startTime) / 1000;
    if (t > 3) t = 3;
    
    let shadows = jsParticles.map(p => {
      let x = p.vx * t;
      let y = (p.vy * t) + (0.5 * g * t * t);
      return x + 'px ' + y + 'px 0 2px ' + p.color;
    });
    
    element.style.boxShadow = shadows.join(', ');
    
    if (t < 3) requestAnimationFrame(step);
  }
    requestAnimationFrame(step);
}`;

  return {
    model: `Particle System (Box-Shadow Trick).\nSimulating ${particleCount} independent kinematic trajectories using a single DOM element's box-shadow property.`,
    breakdown: [], 
    totalTime,
    cssCode,
    jsCode,
    runner: (element) => {
      let startTime = performance.now();
      let anim;
      
      function step(currentTime) {
        let t = (currentTime - startTime) / 1000;