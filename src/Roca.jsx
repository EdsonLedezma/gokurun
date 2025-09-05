import React, { useEffect, useRef } from 'react';

const Roca = ({ id, position, handleCollision }) => {
  const animationRef = useRef();
  const lastCheckTime = useRef(0);

  useEffect(() => {
    const checkCollision = (timestamp) => {
      // Verificar colisión cada 16ms (60 FPS) para mejor responsividad
      if (timestamp - lastCheckTime.current >= 16) {
        const gokuElement = document.querySelector('.goku');
        const rocaElement = document.getElementById(`obstacle-${id}`);

        if (gokuElement && rocaElement) {
          const gokuRect = gokuElement.getBoundingClientRect();
          const rocaRect = rocaElement.getBoundingClientRect();

          // Colisión más realista - las imágenes deben superponerse más
          const collisionMarginX = 20; // Más sensible para colisión
          const collisionMarginY = 15; // Más sensible para colisión

          if (
            gokuRect.right - collisionMarginX > rocaRect.left &&
            gokuRect.left + collisionMarginX < rocaRect.right &&
            gokuRect.bottom - collisionMarginY > rocaRect.top &&
            gokuRect.top + collisionMarginY < rocaRect.bottom
          ) {
            handleCollision(); // Llama a la función de colisión si hay colisión
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
      className={`obstacle roca ${position}`} 
      style={{ 
        width: '200px', 
        height: '150px'
      }}
    />
  );
};

export default Roca;
