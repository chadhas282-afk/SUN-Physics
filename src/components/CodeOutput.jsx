import React, { useState } from 'react';
import LivePreview from './LivePreview';
import { Copy, Check, Code, FileJson, Layers } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function CodeOutput({ currentCode, motionType, compareMode, isGenerating, isGenerated }) {
  const [activeTab, setActiveTab] = useState('css');
  const [copied, setCopied] = useState(false);

  if (!currentCode) return null;
