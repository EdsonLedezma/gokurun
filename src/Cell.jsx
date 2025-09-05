import React, { useEffect, useRef } from 'react';

const Cell = ({ id, position, handleCollision }) => {
  const animationRef = useRef();
  const lastCheckTime = useRef(0);

  useEffect(() => {
    const checkCollision = (timestamp) => {
      // Verificar colisión cada 16ms (60 FPS) para mejor responsividad
      if (timestamp - lastCheckTime.current >= 16) {
        const gokuElement = document.querySelector('.goku');
        const cellElement = document.getElementById(`obstacle-${id}`);

        if (gokuElement && cellElement) {
          const gokuRect = gokuElement.getBoundingClientRect();
          const cellRect = cellElement.getBoundingClientRect();

          // Colisión más realista - las imágenes deben superponerse más
          const collisionMarginX = 20; // Más sensible para colisión
          const collisionMarginY = 15; // Más sensible para colisión

          if (
            gokuRect.right - collisionMarginX > cellRect.left &&
            gokuRect.left + collisionMarginX < cellRect.right &&
            gokuRect.bottom - collisionMarginY > cellRect.top &&
            gokuRect.top + collisionMarginY < cellRect.bottom
          ) {
            handleCollision(); 
            return; // Salir del loop si hay colisión
          }
        }
        lastCheckTime.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(checkCollision);
    };

    animationRef.current = requestAnimationFrame(checkCollision);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleCollision, id]);

  return (
    <div 
      id={`obstacle-${id}`}
      className={`obstacle cell ${position}`} 
      style={{ 
        width: '120px',
        height: '150px'
      }}
    />
  );
};

export default Cell;
