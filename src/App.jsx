import React, { useState, useMemo } from 'react';
import ControlPanel from './components/ControlPanel';
import CodeOutput from './components/CodeOutput';
import LivePreview from './components/LivePreview';
import ConceptModal from './components/ConceptModal';
import { CONCEPTS } from './concepts';
import { calculateBouncingBall, calculateSpring, calculatePendulum, calculateProjectile2D, calculateFriction, calculateOrbital, calculateFluidDrag, calculateParticles } from './physics';
import logo from './assets/logo.jpg';

function App() {
    const [activeConcept, setActiveConcept] = useState(CONCEPTS.find(c => c.id === 'c23'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  
  const [params, setParams] = useState({
    height: 300, gravity: 9.8, restitution: 0.7, mass: 1, stiffness: 100, damping: 10,
    distance: 200, length: 200, angle: 45, velocityX: 50, velocityY: 80, initialVelocity: 300,
    frictionCoefficient: 0.3, starMass: 20000, orbitalVelocity: 100, orbitalDistance: 150, dragCoefficient: 5,
     ...activeConcept.defaultParams
  });

  const handleSelectConcept = (concept) => {
    setActiveConcept(concept);
    setParams(prev => ({ ...prev, ...concept.defaultParams }));
    setIsModalOpen(false);
    setIsGenerated(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 4000);
  };

  const currentCode = useMemo(() => {
    const motionType = activeConcept.engine;
    if (motionType === 'bouncingBall') return calculateBouncingBall(params);
    if (motionType === 'spring') return calculateSpring(params);
    if (motionType === 'pendulum') return calculatePendulum(params);
    if (motionType === 'projectile2D') return calculateProjectile2D(params);
    if (motionType === 'friction') return calculateFriction(params);
    if (motionType === 'orbital') return calculateOrbital({ ...params, initialVelocity: params.orbitalVelocity, distance: params.orbitalDistance });
    if (motionType === 'fluidDrag') return calculateFluidDrag(params);
    if (motionType === 'particles') return calculateParticles(params);
    return null;
  }, [activeConcept, params]);

  return (
    <div className="app-container">
      <header className="app-header fade-in-down">
        <img src={logo} className="logo-img" alt="SUN Physics Logo" />
        <div>
          <h1>SUN Physics</h1>
          <p>Mathematically accurate animation engineering.</p>
        </div>
      </header>
