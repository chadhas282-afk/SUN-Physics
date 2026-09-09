xport const CONCEPTS = [
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