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