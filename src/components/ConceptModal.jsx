import React from 'react';
import { CONCEPTS } from '../concepts';
import { X } from 'lucide-react';

export default function ConceptModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  const categories = [...new Set(CONCEPTS.map(c => c.category))];

  return (