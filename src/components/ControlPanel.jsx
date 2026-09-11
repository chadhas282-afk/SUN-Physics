import React from 'react';
import { LayoutGrid, Info } from 'lucide-react';

const Tooltip = ({ text }) => (
  <span className="tooltip-container">
    <Info size={14} />
    <span className="tooltip-text">{text}</span>
  </span>
);

export default function ControlPanel({ 
  activeConcept, 
  onOpenModal,
  params, 
  setParams, 
  compareMode, 
  setCompareMode,
  onGenerate,
  isGenerating
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: parseFloat(value) || value }));
  };

  const applyPreset = (presetParams) => {
    setParams(prev => ({ ...prev, ...presetParams }));
  };

  const motionType = activeConcept.engine;

  return (
    <div className="control-panel glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Simulation</h2>
        <div className="toggle-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--accent-color)', fontWeight: 600 }}>Compare JS</label>
          <input 
            type="checkbox" 
            checked={compareMode} 
            onChange={e => setCompareMode(e.target.checked)} 
            style={{ cursor: 'pointer', accentColor: 'var(--accent-color)' }}
          />
        </div>
      </div>
      
      <button className="concept-hero-btn fade-in" onClick={onOpenModal}>
        <div className="concept-hero-content">
          <span className="concept-icon-large">{activeConcept.icon}</span>
          <div className="concept-text">
            <span className="concept-label">ACTIVE CONCEPT</span>
            <span className="concept-title">{activeConcept.name}</span>
          </div>
        </div>
        <LayoutGrid className="concept-grid-icon" size={24} />
      </button>
      
      <div className="engine-badge">
        <span>Powered by {motionType.toUpperCase()} Engine</span>
      </div>
      
      <div className="params-divider"></div>
      
      {motionType === 'bouncingBall' && (
        <>
          <div className="form-group">
            <label>Drop Height: {params.height}px</label>
            <input type="range" name="height" min="100" max="600" value={params.height} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Gravity: {params.gravity} m/s²</label>
            <input type="range" name="gravity" min="1" max="25" step="0.1" value={params.gravity} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>
              Restitution: {params.restitution}
              <Tooltip text="Coefficient of Restitution (e). Ratio of final to initial velocity after collision. 1.0 is perfectly elastic, 0 is perfectly inelastic." />
            </label>
            <input type="range" name="restitution" min="0" max="0.99" step="0.05" value={params.restitution} onChange={handleChange} />
          </div>
           <div className="presets-row">
            <button className="preset-btn" onClick={() => applyPreset({ gravity: 1.62, restitution: 0.9 })}>Moon Gravity</button>
            <button className="preset-btn" onClick={() => applyPreset({ gravity: 24.79, restitution: 0.2 })}>Jupiter Gravity</button>
          </div>
        </>
      )}

      {motionType === 'spring' && (
        <>
          <div className="form-group"></div>
          <label>Initial Displacement: {params.distance}px</label>
            <input type="range" name="distance" min="-300" max="400" value={params.distance} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>
              Stiffness (k): {params.stiffness}
              <Tooltip text="Hooke's Law constant. Higher stiffness means a tighter spring that oscillates faster." />
            </label>
            <input type="range" name="stiffness" min="10" max="500" value={params.stiffness} onChange={handleChange} />
          </div>
           <div className="form-group">
            <label>
              Damping (c): {params.damping}
              <Tooltip text="Friction/Resistance factor. Higher damping causes the oscillation to decay more rapidly to rest." />
            </label>
            <input type="range" name="damping" min="1" max="50" value={params.damping} onChange={handleChange} />
          </div>
          <div className="presets-row">
            <button className="preset-btn" onClick={() => applyPreset({ stiffness: 500, damping: 2 })}>Undamped</button>
            <button className="preset-btn" onClick={() => applyPreset({ stiffness: 100, damping: 50 })}>Overdamped</button>
          </div>
           </>
      )}

      {motionType === 'pendulum' && (
        <>
          <div className="form-group">
            <label>Initial Angle: {params.angle}°</label>
            <input type="range" name="angle" min="5" max="90" value={params.angle} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Length: {params.length}px</label>
            <input type="range" name="length" min="50" max="400" value={params.length} onChange={handleChange} />
          </div>
          <div className="presets-row">
            <button className="preset-btn" onClick={() => applyPreset({ angle: 90, length: 300 })}>Max Swing</button>
            <button className="preset-btn" onClick={() => applyPreset({ angle: 10, length: 100 })}>Fast Ticks</button>
          </div>
        </>
      )}

      {motionType === 'projectile2D' && (
        <>
          <div className="form-group">
            <label>Initial X Velocity: {params.velocityX}</label>
            <input type="range" name="velocityX" min="10" max="150" value={params.velocityX} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Initial Y Velocity: {params.velocityY}</label>
            <input type="range" name="velocityY" min="10" max="150" value={params.velocityY} onChange={handleChange} />
          </div>