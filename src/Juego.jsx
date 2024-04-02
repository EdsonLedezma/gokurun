import React, { useState } from 'react';
import Escenario from './Escenario';
import Goku from './Goku';
import Roca from './Roca';
import Cell from './Cell';

const Juego = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  
 

  const handleCollision = () => {
    setIsGameOver(true); // Cambia el estado de juego a Game Over
  };

  return (
    <div className="juego">
      {isGameOver ? (
        <div>¡Game Over!</div>
      ) : (
        <>
          
          <Escenario>
          <Goku isJumping={isJumping} handleCollision={handleCollision} />
            <Roca handleCollision={handleCollision} />
            <Cell handleCollision={handleCollision} />
          </Escenario>
        </>
      )}
    </div>
  );
};

export default Juego;
