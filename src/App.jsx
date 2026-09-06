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
