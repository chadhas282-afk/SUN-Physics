import React, { useState } from 'react';
import LivePreview from './LivePreview';
import { Copy, Check, Code, FileJson, Layers } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function CodeOutput({ currentCode, motionType, compareMode, isGenerating, isGenerated }) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  if (!currentCode) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reactSnippet = `import React from 'react';
import './physics.css';

export default function PhysicsComponent() {
  return (
    <div className="physics-container">
      <div className="animated-object"></div>
    </div>
  );
}`;

  return (
    <div className="code-output glass-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Developer Export Hub</h2>
      </div>

      {isGenerating ? (
         <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
           <img src={logo} className="generating-logo" alt="Generating Logo" />
           <div className="skeleton-shimmer" style={{ width: '100%' }}></div>
           <div className="skeleton-shimmer" style={{ width: '100%' }}></div>
           <div className="skeleton-shimmer" style={{ width: '60%' }}></div>