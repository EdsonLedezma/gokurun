import React, { useEffect } from 'react';

const Cell = ({ handleCollision }) => {
  useEffect(() => {
    const checkCollision = () => {
      const gokuElement = document.querySelector('.goku');
      const cellElement = document.querySelector('.cell');

      if (gokuElement && cellElement) {
        const gokuRect = gokuElement.getBoundingClientRect();
        const cellRect = cellElement.getBoundingClientRect();

        const collisionMargin = 35; // Margen de colisión para ajustar el centro de Goku

        if (
          gokuRect.right - collisionMargin > cellRect.left &&
          gokuRect.left + collisionMargin < cellRect.right &&
          gokuRect.bottom - collisionMargin > cellRect.top &&
          gokuRect.top + collisionMargin < cellRect.bottom
        ) {
          handleCollision(); 
        }
      }
    };

    const collisionCheckInterval = setInterval(checkCollision, 50); // Verifica la colisión cada 50ms

    return () => clearInterval(collisionCheckInterval);
  }, [handleCollision]);

  return <div className="obstacle cell" style={{ bottom: '160px', width: '120px' ,height: '150px' }}></div>;
};

export default Cell;
