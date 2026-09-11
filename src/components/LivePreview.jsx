import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function LivePreview({ motionType, currentCode, compareMode, isGenerating, isGenerated }) {
  const containerRef = useRef(null);
  const ghostRef = useRef(null);
  const sliderRef = useRef(null);
  const timeDisplayRef = useRef(null);
  const progressFillRef = useRef(null);