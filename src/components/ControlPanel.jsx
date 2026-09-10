mport React from 'react';
import { LayoutGrid, Info } from 'lucide-react';

const Tooltip = ({ text }) => (
  <span className="tooltip-container">
    <Info size={14} />
    <span className="tooltip-text">{text}</span>
  </span>
);
