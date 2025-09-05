import React, { useState, useEffect, useRef, useCallback } from 'react';

const Goku = ({ onCollision }) => {
  const [isJumping, setIsJumping] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [jumpHeight, setJumpHeight] = useState(0);
  const animationRef = useRef();
  const jumpAnimationRef = useRef();
  const frameTimeRef = useRef(0);
  const jumpTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // Función optimizada para animación de frames usando requestAnimationFrame
  const animateFrames = useCallback((timestamp) => {
    if (!lastFrameTimeRef.current) lastFrameTimeRef.current = timestamp;
    
    const deltaTime = timestamp - lastFrameTimeRef.current;
    
    // Solo animar frames cuando no está saltando
    if (!isJumping && deltaTime >= 80) {
      setCurrentFrame(prevFrame => prevFrame === 8 ? 1 : prevFrame + 1);
      lastFrameTimeRef.current = timestamp;
    }
    
    animationRef.current = requestAnimationFrame(animateFrames);
  }, [isJumping]);

  // Función optimizada para salto usando requestAnimationFrame
  const animateJump = useCallback((timestamp) => {
    if (!jumpTimeRef.current) jumpTimeRef.current = timestamp;
    
    const jumpDuration = 600; // Duración del salto en ms
    const elapsed = timestamp - jumpTimeRef.current;
    const progress = Math.min(elapsed / jumpDuration, 1);
    
    // Curva de salto más suave (ease-out)
    const maxHeight = 470;
    const currentHeight = maxHeight * Math.sin(progress * Math.PI);
    
    // Controlar los frames del salto
    let jumpFrame;
    if (progress < 0.2) {
      // Frames 1-3: subiendo
      jumpFrame = Math.floor(progress * 15) + 1; // 1-3
    } else if (progress < 0.8) {
      // Frame 4: en el pico del salto
      jumpFrame = 4;
    } else {
      // Frames 5-8: cayendo
      jumpFrame = Math.floor((progress - 0.8) * 20) + 5; // 5-8
    }
    
    setCurrentFrame(jumpFrame);
    setJumpHeight(currentHeight);
    
    if (progress < 1) {
      jumpAnimationRef.current = requestAnimationFrame(animateJump);
    } else {
      setJumpHeight(0);
      setIsJumping(false);
      jumpTimeRef.current = 0;
    }
  }, []);

  // Iniciar animación de frames
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateFrames);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateFrames]);

  // Manejar salto
  useEffect(() => {
    if (isJumping) {
      jumpTimeRef.current = 0;
      jumpAnimationRef.current = requestAnimationFrame(animateJump);
    }
    
    return () => {
      if (jumpAnimationRef.current) {
        cancelAnimationFrame(jumpAnimationRef.current);
      }
    };
  }, [isJumping, animateJump]);

  // Event listener para salto
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" && !isJumping) {
        event.preventDefault();
        setIsJumping(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping]);

  return (
    <div 
      className="goku" 
      style={{ 
        position: 'absolute', 
        bottom: '30vh', // Posición relativa a la altura de la ventana
        height: '140px', 
        width: '140px', 
        marginBottom: `${jumpHeight}px`,
        willChange: 'transform', // Optimización para GPU
        imageRendering: 'pixelated' // Mejor renderizado de sprites
      }}
    >
      <img 
        src={`goku_${isJumping ? 'jump' : 'run'}_${currentFrame}.png`} 
        alt="Goku" 
      />
    </div>
  );
};

export default Goku;


