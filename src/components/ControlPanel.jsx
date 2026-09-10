mport React from 'react';
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