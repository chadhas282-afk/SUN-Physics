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
           <div className="skeleton-shimmer" style={{ width: '40%' }}></div>
           <div className="skeleton-text">Writing mathematical runner...</div>
         </div>
      ) : !isGenerated ? (
         <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)' }}>
           <img src={logo} className="empty-state-logo" alt="Empty State Logo" />
           <p>Code will appear after generation.</p>
         </div>
      ) : (
         <>
         <div className="export-tabs">
        <button className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`} onClick={() => setActiveTab('css')}>
          <Code size={16} /> CSS Keyframes
        </button>
        <button className={`tab-btn ${activeTab === 'js' ? 'active' : ''}`} onClick={() => setActiveTab('js')}>
          <FileJson size={16} /> Vanilla JS
        </button>
        <button className={`tab-btn ${activeTab === 'react' ? 'active' : ''}`} onClick={() => setActiveTab('react')}>
          <Layers size={16} /> React Component
        </button>
        </div>

      <div className="code-block-container">
        <button 
          className="copy-btn" 
          onClick={() => handleCopy(activeTab === 'css' ? currentCode.cssCode : activeTab === 'js' ? currentCode.jsCode : reactSnippet)}
        >
          {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
        </button>
        
        <pre>
          <code>
            {isGenerated && activeTab === 'css' && currentCode.cssCode}
            {isGenerated && activeTab === 'js' && currentCode.jsCode}
            {isGenerated && activeTab === 'react' && reactSnippet}
          </code>
        </pre>
      </div>
      
      <div className="output-section" style={{ marginTop: '2rem' }}></div>