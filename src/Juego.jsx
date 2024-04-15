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

  const handleCollision = () => {
    setIsGameOver(true);
  };

  const restartGame = () => {
    setIsGameOver(false);
    
  };
  useEffect(() => {
    const timerInterval = setInterval(() => {
      
      setScore(prevScore => prevScore + 5);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);
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
  
  if(isGameOver){
    
    for (let i = 0; i < 1; i++) {
      enviarRecord();
    }
  }
  return (
    <div className="juego">
      {isGameOver ? (
        <div style={{
          position: 'fixed',
          top: '50%',
          textAlign: 'center',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '106px',
          fontWeight: 'bold',
          color: 'red'
        }}>
          <Escenario >
            ¡Game Over!
            <button style={{
              display: 'block',
              margin: '0 auto',
              padding: '15px 30px',
              borderRadius: '25px',
              backgroundColor: '#008000',
              color: '#ffff00',
              fontSize: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease-in-out'
            }}>
              <Link to="/" style={{ color: '#ffff00', textDecoration: 'none' }}>Volver al inicio</Link>
            </button>
          </Escenario>
        </div>
      ) : (
        <Escenario handleCollision={handleCollision} >
          <Goku isJumping={isJumping} handleCollision={handleCollision} />
        </Escenario>
      )}
    </div>
  );
};

export default Juego;