export const CONCEPTS = [
  { id: 'c1', name: 'Rubber Band Snap', icon: '〰️', category: 'Oscillators', engine: 'spring', defaultParams: { distance: 150, stiffness: 300, damping: 5 } },
  { id: 'c2', name: 'Car Suspension', icon: '🚙', category: 'Oscillators', engine: 'spring', defaultParams: { distance: -100, stiffness: 200, damping: 20 } },
  { id: 'c3', name: 'Bungee Jump', icon: '🪢', category: 'Oscillators', engine: 'spring', defaultParams: { distance: 300, stiffness: 50, damping: 2 } },
  { id: 'c4', name: 'Guitar String', icon: '🎸', category: 'Oscillators', engine: 'spring', defaultParams: { distance: 50, stiffness: 450, damping: 8 } },
  { id: 'c5', name: 'Trampoline Bounce', icon: '🤸', category: 'Oscillators', engine: 'spring', defaultParams: { distance: 200, stiffness: 150, damping: 10 } },
  
  { id: 'c6', name: 'Grandfather Clock', icon: '🕰️', category: 'Oscillators', engine: 'pendulum', defaultParams: { angle: 15, length: 300 } },
  { id: 'c7', name: 'Wrecking Ball', icon: '🏗️', category: 'Oscillators', engine: 'pendulum', defaultParams: { angle: 60, length: 250 } },
  { id: 'c8', name: 'Playground Swing', icon: '🛝', category: 'Oscillators', engine: 'pendulum', defaultParams: { angle: 45, length: 150 } },
  { id: 'c9', name: 'Metronome', icon: '🎵', category: 'Oscillators', engine: 'pendulum', defaultParams: { angle: 30, length: 100 } },
  { id: 'c10', name: 'Hypnotist Pocket Watch', icon: '😵‍💫', category: 'Oscillators', engine: 'pendulum', defaultParams: { angle: 25, length: 120 } },

  { id: 'c11', name: 'Ping Pong Ball', icon: '🏓', category: 'Kinematics', engine: 'bouncingBall', defaultParams: { height: 300, gravity: 9.8, restitution: 0.9 } },
  { id: 'c12', name: 'Bowling Ball Drop', icon: '🎳', category: 'Kinematics', engine: 'bouncingBall', defaultParams: { height: 300, gravity: 9.8, restitution: 0.1 } },
  { id: 'c13', name: 'Super Bouncy Ball', icon: '🟣', category: 'Kinematics', engine: 'bouncingBall', defaultParams: { height: 400, gravity: 9.8, restitution: 0.95 } },
  { id: 'c14', name: 'Water Balloon Drop', icon: '🎈', category: 'Kinematics', engine: 'bouncingBall', defaultParams: { height: 200, gravity: 9.8, restitution: 0.05 } },
  
  { id: 'c15', name: 'Basketball Free Throw', icon: '🏀', category: 'Kinematics', engine: 'projectile2D', defaultParams: { velocityX: 40, velocityY: 90, gravity: 9.8 } },
  { id: 'c16', name: 'Golf Drive', icon: '⛳', category: 'Kinematics', engine: 'projectile2D', defaultParams: { velocityX: 80, velocityY: 60, gravity: 9.8 } },
  { id: 'c17', name: 'Cannon Fire', icon: '💣', category: 'Kinematics', engine: 'projectile2D', defaultParams: { velocityX: 100, velocityY: 100, gravity: 9.8 } },
  { id: 'c18', name: 'Spitball', icon: '💨', category: 'Kinematics', engine: 'projectile2D', defaultParams: { velocityX: 60, velocityY: 20, gravity: 9.8 } },
  
  { id: 'c19', name: 'Ice Skating', icon: '⛸️', category: 'Kinematics', engine: 'friction', defaultParams: { initialVelocity: 300, frictionCoefficient: 0.05, gravity: 9.8 } },
  { id: 'c20', name: 'Billiards Break', icon: '🎱', category: 'Kinematics', engine: 'friction', defaultParams: { initialVelocity: 400, frictionCoefficient: 0.15, gravity: 9.8 } },
  { id: 'c21', name: 'Sliding on Gravel', icon: '🪨', category: 'Kinematics', engine: 'friction', defaultParams: { initialVelocity: 300, frictionCoefficient: 0.6, gravity: 9.8 } },
  { id: 'c22', name: 'Puck on Air Hockey', icon: '🥏', category: 'Kinematics', engine: 'friction', defaultParams: { initialVelocity: 500, frictionCoefficient: 0.01, gravity: 9.8 } },

  { id: 'c23', name: 'Lunar Orbit', icon: '🌕', category: 'Orbital Mechanics', engine: 'orbital', defaultParams: { starMass: 10000, orbitalVelocity: 9.1, orbitalDistance: 120 } },
  { id: 'c24', name: 'ISS Satellite', icon: '🛰️', category: 'Orbital Mechanics', engine: 'orbital', defaultParams: { starMass: 20000, orbitalVelocity: 18.2, orbitalDistance: 60 } },
  { id: 'c25', name: 'Comet Slingshot', icon: '☄️', category: 'Orbital Mechanics', engine: 'orbital', defaultParams: { starMass: 30000, orbitalVelocity: 8.0, orbitalDistance: 150 } },
  { id: 'c26', name: 'Close Binary Star', icon: '✨', category: 'Orbital Mechanics', engine: 'orbital', defaultParams: { starMass: 50000, orbitalVelocity: 22.3, orbitalDistance: 100 } },
  
  { id: 'c27', name: 'Honey Drop', icon: '🍯', category: 'Fluid Dynamics', engine: 'fluidDrag', defaultParams: { mass: 5, dragCoefficient: 15 } },
  { id: 'c28', name: 'Parachute Fall', icon: '🪂', category: 'Fluid Dynamics', engine: 'fluidDrag', defaultParams: { mass: 80, dragCoefficient: 20 } },
  { id: 'c29', name: 'Raindrop', icon: '💧', category: 'Fluid Dynamics', engine: 'fluidDrag', defaultParams: { mass: 0.5, dragCoefficient: 2 } },
  { id: 'c30', name: 'Sinking Stone', icon: '🪨', category: 'Fluid Dynamics', engine: 'fluidDrag', defaultParams: { mass: 50, dragCoefficient: 5 } },
  { id: 'c31', name: 'Feather Falling', icon: '🪶', category: 'Fluid Dynamics', engine: 'fluidDrag', defaultParams: { mass: 0.1, dragCoefficient: 10 } },
  
  { id: 'c32', name: 'Confetti Cannon', icon: '🎊', category: 'Particle Systems', engine: 'particles', defaultParams: { particleCount: 30, explosionForce: 100, gravity: 9.8 } },
  { id: 'c33', name: 'Fireworks Shell', icon: '🎆', category: 'Particle Systems', engine: 'particles', defaultParams: { particleCount: 50, explosionForce: 250, gravity: 4.0 } },
  { id: 'c34', name: 'Welding Sparks', icon: '💥', category: 'Particle Systems', engine: 'particles', defaultParams: { particleCount: 20, explosionForce: 80, gravity: 15.0 } }
];
