import React, { useEffect } from 'react';

const Roca = ({ handleCollision }) => {
  useEffect(() => {
    const checkCollision = () => {
      const gokuRect = document.querySelector('.goku').getBoundingClientRect();
      const rocaRect = document.querySelector('.roca').getBoundingClientRect();

      const collisionMargin = 30; // Margen de colisión para ajustar el centro de Goku

      if (
        gokuRect.right - collisionMargin > rocaRect.left &&
        gokuRect.left + collisionMargin < rocaRect.right &&
        gokuRect.bottom - collisionMargin > rocaRect.top &&
        gokuRect.top + collisionMargin < rocaRect.bottom
      ) {
        handleCollision(); // Llama a la función de colisión si hay colisión
      }
    };

    const collisionCheckInterval = setInterval(checkCollision, 50); // Verifica la colisión cada 50ms

    return () => clearInterval(collisionCheckInterval);
  }, [handleCollision]);

  return <div className="obstacle roca" style={{ bottom: '140px' }}></div>;
};

export default Roca;
