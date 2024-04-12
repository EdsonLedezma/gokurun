import React, { useEffect } from 'react';

const Roca = ({ handleCollision }) => {
  useEffect(() => {
    const checkCollision = () => {
      const gokuElement = document.querySelector('.goku');
      const rocaElement = document.querySelector('.roca');

      if (gokuElement && rocaElement) {
        const gokuRect = gokuElement.getBoundingClientRect();
        const rocaRect = rocaElement.getBoundingClientRect();

        const collisionMargin = 20; // Margen de colisión para ajustar el centro de Goku

        if (
          gokuRect.right - collisionMargin > rocaRect.left &&
          gokuRect.left + collisionMargin < rocaRect.right &&
          gokuRect.bottom - collisionMargin > rocaRect.top &&
          gokuRect.top + collisionMargin < rocaRect.bottom
        ) {
          handleCollision(); // Llama a la función de colisión si hay colisión
        }
      }
    };

    const collisionCheckInterval = setInterval(checkCollision, 20); // Verifica la colisión cada 50ms

    return () => clearInterval(collisionCheckInterval);
  }, [handleCollision]);

  return <div className="obstacle roca" style={{ bottom: '150px', width: '200px', height: '150px' }}></div>;
};

export default Roca;
