import React, { useEffect } from 'react';

const Cell = ({ handleCollision }) => {
  useEffect(() => {
    const checkCollision = () => {
      const gokuRect = document.querySelector('.goku').getBoundingClientRect();
      const cellRect = document.querySelector('.cell').getBoundingClientRect();

      const collisionMargin = 30; // Margen de colisión para ajustar el centro de Goku

      if (
        gokuRect.right - collisionMargin > cellRect.left &&
        gokuRect.left + collisionMargin < cellRect.right &&
        gokuRect.bottom - collisionMargin > cellRect.top &&
        gokuRect.top + collisionMargin < cellRect.bottom
      ) {
        handleCollision(); // Llama a la función de colisión si hay colisión
      }
    };

    const collisionCheckInterval = setInterval(checkCollision, 50); // Verifica la colisión cada 50ms

    return () => clearInterval(collisionCheckInterval);
  }, [handleCollision]);

  return <div className="obstacle cell" style={{ bottom: '140px' }}></div>;
};

export default Cell;
