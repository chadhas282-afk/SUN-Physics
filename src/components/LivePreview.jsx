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
        } else {
        updateUIProgress((elapsed / currentCode.totalTime) * 100);
        progressRAF.current = requestAnimationFrame(updateProgress);
      }
    };
    progressRAF.current = requestAnimationFrame(updateProgress);
  };

  const stopTracking = () => {
    if (progressRAF.current) cancelAnimationFrame(progressRAF.current);
    if (ghostRAF.current) cancelAnimationFrame(ghostRAF.current);
  };
  useEffect(() => {
    if (!isGenerated || !currentCode?.cssCode) return;
    const styleId = 'physics-animator-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
       }
    styleTag.innerHTML = currentCode.cssCode;
    
    setIsPlaying(true);
    updateUIProgress(0);
    
    const el = containerRef.current;
    const animNameMatch = currentCode.cssCode.match(/@keyframes\s+([a-zA-Z0-9_]+)/);
    const animName = animNameMatch ? animNameMatch[1] : '';

     if (el && animName) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = `${animName} ${currentCode.totalTime}s linear forwards`;
      el.style.animationDelay = '0s';
      el.style.animationPlayState = 'running';
      
      startTracking();
    }

    return () => stopTracking();
  }, [currentCode, compareMode, isGenerated]); 

  const handleScrub = (e) => {
    const val = parseFloat(e.target.value);
    updateUIProgress(val);
    
    const el = containerRef.current;
    if (el && currentCode) {
      const delaySeconds = (val / 100) * currentCode.totalTime;
       el.style.animationDelay = `-${delaySeconds}s`;
      
      if (isPlaying) {
        stopTracking();
        el.style.animationPlayState = 'paused';
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = () => {
    const el = containerRef.current;
    if (!el || !currentCode) return;

    if (progressRef.current >= 100) {
      updateUIProgress(0);
      el.style.animation = 'none';
      void el.offsetWidth;
      const animNameMatch = currentCode.cssCode.match(/@keyframes\s+([a-zA-Z0-9_]+)/);
      el.style.animation = `${animNameMatch ? animNameMatch[1] : ''} ${currentCode.totalTime}s linear forwards`;
       el.style.animationDelay = '0s';
      el.style.animationPlayState = 'running';
      startTracking();
      setIsPlaying(true);
    } else if (isPlaying) {
      stopTracking();
      el.style.animationPlayState = 'paused';
      setIsPlaying(false);
    } else {
      el.style.animationPlayState = 'running';