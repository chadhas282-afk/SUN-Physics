import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function LivePreview({ motionType, currentCode, compareMode, isGenerating, isGenerated }) {
  const containerRef = useRef(null);
  const ghostRef = useRef(null);
  const sliderRef = useRef(null);
  const timeDisplayRef = useRef(null);
  const progressFillRef = useRef(null);
    
  const [isPlaying, setIsPlaying] = useState(true);
  const progressRef = useRef(0);
  
  const progressRAF = useRef(null);
  const ghostRAF = useRef(null);
  const startTimeRef = useRef(0);

  const updateUIProgress = (val) => {
    progressRef.current = val;
    if (sliderRef.current) sliderRef.current.value = val;
    if (progressFillRef.current) progressFillRef.current.style.width = `${val}%`;
    if (timeDisplayRef.current && currentCode) {
      timeDisplayRef.current.innerText = `${((val / 100) * currentCode.totalTime).toFixed(2)}s / ${currentCode.totalTime.toFixed(2)}s`;
    }
  };

  const startTracking = () => {
    if (progressRAF.current) cancelAnimationFrame(progressRAF.current);
    if (ghostRAF.current) cancelAnimationFrame(ghostRAF.current);

    if (!currentCode) return;

    const delaySeconds = (progressRef.current / 100) * currentCode.totalTime;
    startTimeRef.current = performance.now() - (delaySeconds * 1000);
    
    if (compareMode && ghostRef.current && currentCode.runner && progressRef.current === 0) {
      ghostRef.current.style.transform = 'none';
      ghostRef.current.style.opacity = '0.6';
      void ghostRef.current.offsetWidth;
       ghostRAF.current = currentCode.runner(ghostRef.current);
    } else if (ghostRef.current) {
      ghostRef.current.style.opacity = '0';
    }

    const updateProgress = (time) => {
      let elapsed = (time - startTimeRef.current) / 1000;
      if (elapsed >= currentCode.totalTime) {
        updateUIProgress(100);
        setIsPlaying(false);