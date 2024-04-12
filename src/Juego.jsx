import React, { useState, useEffect } from 'react';
import Escenario from './Escenario';
import Goku from './Goku';

const Juego = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleCollision = () => {
    setIsGameOver(true);
  };

  const restartGame = () => {
    setIsGameOver(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isGameOver && (event.code === 'Enter' || event.code === 'Return')) {
        restartGame();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGameOver]);

  return (
    <div className="juego">
      {isGameOver ? (
        
        <div style={{
          position: 'fixed',
          top: '50%',
          textAlign: 'center',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '156px',
          fontWeight: 'bold',
          color: 'red'
        }}><Escenario>¡Game Over!</Escenario></div>
        
        
      ) : (
        <Escenario handleCollision={handleCollision}>
          <Goku isJumping={isJumping} handleCollision={handleCollision} />
        </Escenario>
      )}
    </div>
  );
};

export default Juego;
