import React from 'react';
import { CONCEPTS } from '../concepts';
import { X } from 'lucide-react';

export default function ConceptModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  const categories = [...new Set(CONCEPTS.map(c => c.category))];

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-content glass-panel fade-in-up">
        <div className="modal-header">
          <h2>Concept Library</h2>
          <button className="icon-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="modal-body">
          {categories.map(category => (
            <div key={category} className="category-section"></div>