import React, { useState, useEffect } from 'react';

const Goku = ({ isJumping, handleCollision }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [jumpHeight, setJumpHeight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(frame => (frame === 8 ? 1 : frame + 1)); // Ciclo de 1 a 8
    }, 50); // Cambiar el fotograma cada 150ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isJumping) {
      setJumpHeight(60); // Altura máxima del salto
      const jumpInterval = setInterval(() => {
        setJumpHeight(prevHeight => {
          if (prevHeight > 0) {
            return prevHeight - 5; // Disminuir la altura del salto
          } else {
            clearInterval(jumpInterval);
            return 0;
          }
        });
      }, 60); // Velocidad de ascenso y descenso durante el salto
    }
  }, [isJumping]);

  useEffect(() => {
    const collisionCheckInterval = setInterval(() => {
      // Detecta la colisión con los obstáculos
      const gokuRect = document.querySelector('.goku').getBoundingClientRect();
      const obstacleRects = document.querySelectorAll('.obstacle');

      obstacleRects.forEach(obstacleRect => {
        if (
          gokuRect.right > obstacleRect.left &&
          gokuRect.left < obstacleRect.right &&
          gokuRect.bottom > obstacleRect.top &&
          gokuRect.top < obstacleRect.bottom
        ) {
          handleCollision(); // Llama a la función de colisión si hay colisión
        }
      });
    }, 50); // Verifica la colisión cada 50ms

    return () => clearInterval(collisionCheckInterval);
  }, [handleCollision]);

  return (
    <div className="goku" style={{ bottom: `${jumpHeight}px` }}>
      <img src={`goku_${isJumping ? 'jump' : 'run'}_${currentFrame}.png`} alt="Goku" />
    </div>
  );
};

export default Goku;
