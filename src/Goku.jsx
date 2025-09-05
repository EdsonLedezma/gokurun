import React, { useState, useEffect } from 'react';

const Goku = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [jumpHeight, setJumpHeight] = useState(0);

  useEffect(() => {
    const frameInterval = setInterval(() => {
      if (isJumping) {
        setCurrentFrame(frame => (frame === 8? 1 : frame + 1));
      } else {
        setCurrentFrame(frame => (frame === 8? 1 : frame + 1));
      }
    }, 150); 
  
    return () => clearInterval(frameInterval);
  }, [isJumping]);
  
  useEffect(() => {
    if (isJumping) {
      setJumpHeight(470);
      const jumpInterval = setInterval(() => {
        setJumpHeight(prevHeight => {
          if (prevHeight > 0) {
            return prevHeight - 7;
          } else {
            clearInterval(jumpInterval);
            setIsJumping(false);
            return 0;
          }
        });
      }, 10);
    }
  }, [isJumping]);
  
  useEffect(() => {
    if (isJumping && currentFrame === 4) {
      setTimeout(() => {
        setCurrentFrame(4);
      }, 1000); 
    }
  }, [currentFrame, isJumping]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setIsJumping(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

 

  return (
    <div className="goku" style={{ position: 'absolute', bottom: `270px`, height: '140px', width: '140px', marginBottom: `${jumpHeight}px` }}>
      <img src={`goku_${isJumping ? 'jump' : 'run'}_${currentFrame}.png`} alt="Goku" />
    </div>
  );
};

export default Goku;


