
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