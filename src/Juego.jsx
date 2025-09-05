import React, { useState, useEffect } from 'react';
import Escenario from './Escenario';
import Goku from './Goku';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Juego = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const location = useLocation();
  const nombreJugador = location.state?.nombre || 'Anónimo';
  const [score, setScore] = useState(0);

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  const handleCollision = () => {
    setIsGameOver(true);
  };

  const restartGame = () => {
    setIsGameOver(false);
    
  };
  // El score ahora se maneja en el componente Escenario para evitar duplicación
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

  
  const enviarRecord = async () => {
    try {
      // Crear el nuevo registro con la puntuación y el nombre
      const newRecord = { nombre: nombreJugador, score: score };
  
      // Enviar el nuevo registro a la API
      const response = await fetch('https://getpantry.cloud/apiv1/pantry/6df0687d-d6bc-4335-b99f-f876ee81c71f/basket/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el puntaje a la API');
      }
  
      console.log('Puntaje enviado a la API:', score);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Enviar record solo una vez cuando el juego termina
  useEffect(() => {
    if (isGameOver) {
      enviarRecord();
    }
  }, [isGameOver]);
  return (
    <div className="juego">
      <Escenario handleCollision={handleCollision} onScoreUpdate={handleScoreUpdate} isGameOver={isGameOver}>
        {!isGameOver && <Goku isJumping={isJumping} handleCollision={handleCollision} />}
      </Escenario>
      
      {isGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h1 className="game-over-text">¡Game Over!</h1>
            <button className="restart-button">
              <Link to="/" style={{ color: '#ffff00', textDecoration: 'none' }}>Volver al inicio</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Juego;