import React, { useState, useMemo } from 'react';
import ControlPanel from './components/ControlPanel';
import CodeOutput from './components/CodeOutput';
import LivePreview from './components/LivePreview';
import ConceptModal from './components/ConceptModal';
import { CONCEPTS } from './concepts';
import { calculateBouncingBall, calculateSpring, calculatePendulum, calculateProjectile2D, calculateFriction, calculateOrbital, calculateFluidDrag, calculateParticles } from './physics';
import logo from './assets/logo.jpg';

function App() {