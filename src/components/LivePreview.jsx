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
       startTracking();
      setIsPlaying(true);
    }
  };

  const renderObject = (className, ref, isGhost = false) => {
    const ghostClass = isGhost ? ' ghost-element' : ' css-element';
    
    if (motionType === 'bouncingBall') return <div ref={ref} className={`ball${ghostClass}`}></div>;
    if (motionType === 'spring') return <div ref={ref} className={`box${ghostClass}`}></div>;
    if (motionType === 'pendulum') return <div ref={ref} className={`pendulum-arm${ghostClass}`}><div className="pendulum-bob"></div></div>;
    if (motionType === 'projectile2D') return <div className="cannonball-container"><div ref={ref} className={`cannonball${ghostClass}`}></div></div>;
    if (motionType === 'friction') return <div className="friction-track"><div ref={ref} className={`friction-block${ghostClass}`}></div></div>;
    if (motionType === 'orbital') return <div className="orbital-system"><div className="star"></div><div ref={ref} className={`planet${ghostClass}`}></div></div>;
    if (motionType === 'fluidDrag') return <div className="fluid-container"><div ref={ref} className={`droplet${ghostClass}`}></div></div>;
    if (motionType === 'particles') return <div className="particle-system" ref={ref}><div className={`particle${ghostClass}`}></div></div>;
    
    return null;
  };

  return (
    <div className="preview-container" style={{ borderRadius: '12px', border: '1px solid var(--panel-border)', display: 'flex', flexDirection: 'column' }}>
       {isGenerating ? (
         <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
           <img src={logo} className="generating-logo" alt="Generating Logo" />
           <div className="skeleton-shimmer large"></div>
           <div className="skeleton-text">SUN is revising the concept and generating...</div>
         </div>
       ) : !isGenerated ? (
         <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)' }}>
           <img src={logo} className="empty-state-logo" alt="Empty State Logo" />
           <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>Select a concept and click ✨ Generate Concept.</p>
         </div>
       ) : (
         <>
           <div className={`preview-stage ${motionType}-stage`}>
             {renderObject('css-element', containerRef)}
             {compareMode && renderObject('ghost-element', ghostRef, true)}
           </div>

           <div className="scrubber-bar">
             <button className="playback-btn" onClick={togglePlay}>
               {isPlaying ? <Pause size={18} /> : (progressRef.current >= 100 ? <RotateCcw size={18} /> : <Play size={18} />)}
             </button>
             
             <div className="timeline-container">
               <input 
                 ref={sliderRef}
                 type="range" 
                 min="0" 