import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Escenario.css'; 
import Cell from './Cell'; 
import Roca from './Roca'; 
import { useLocation } from 'react-router-dom';

const Escenario = ({ children, handleCollision, onScoreUpdate, isGameOver}) => {
  const location = useLocation();
  const nombreJugador = location.state?.nombre || 'Anónimo';
  const [obstacles, setObstacles] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [score, setScore] = useState(0);
  
  const gameLoopRef = useRef();
  const lastObstacleTime = useRef(0);
  const lastScoreTime = useRef(0);
  const gameStartTime = useRef(0);
  const obstacleIdCounter = useRef(0);
  
  // Calcular velocidad basada en el tiempo transcurrido
  const gameSpeed = Math.min(1 + Math.floor(timeElapsed / 3), 3);

  // Función optimizada para el game loop principal
  const gameLoop = useCallback((timestamp) => {
    // Pausar el game loop si el juego terminó
    if (isGameOver) {
      return;
    }

    const currentTime = timestamp;

    // Generar obstáculos cada 2 segundos (más simple)
    if (currentTime - lastObstacleTime.current >= 2000) {
      const newObstacle = {
        id: obstacleIdCounter.current++,
        type: Math.random() < 0.5 ? 'roca' : 'cell',
        position: Math.random() < 0.5 ? 'ground' : 'air', // 50% suelo, 50% aire
        speed: gameSpeed
      };
      
      setObstacles(prev => [...prev, newObstacle]);
      lastObstacleTime.current = currentTime;
    }

    // Actualizar puntaje cada segundo
    if (currentTime - lastScoreTime.current >= 1000) {
      setTimeElapsed(prevTime => prevTime + 1);
      setScore(prevScore => {
        const newScore = prevScore + 5;
        if (onScoreUpdate) {
          onScoreUpdate(newScore);
        }
        return newScore;
      });
      lastScoreTime.current = currentTime;
    }

    // Limpiar obstáculos que salieron de pantalla
    setObstacles(prev => prev.filter(obstacle => {
      const obstacleElement = document.getElementById(`obstacle-${obstacle.id}`);
      if (obstacleElement) {
        const rect = obstacleElement.getBoundingClientRect();
        return rect.right > -100; // Mantener un poco fuera de pantalla
      }
      return true;
    }));

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [isGameOver]);

  // Iniciar el game loop
  useEffect(() => {
    if (!isGameOver) {
      // Solo establecer el tiempo de inicio si no está ya establecido
      if (gameStartTime.current === 0) {
        gameStartTime.current = Date.now();
      }
      lastObstacleTime.current = 0;
      lastScoreTime.current = 0;
      obstacleIdCounter.current = 0;
      setObstacles([]);
      setTimeElapsed(0);
      setScore(0);
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isGameOver]);

  

  return (
    <div className={`escenario ${isGameOver ? 'game-over' : ''}`}>
      <div className="info">
        <div>Nombre: {nombreJugador}</div>
        <div>Tiempo: {timeElapsed} seg</div>
        <div>Puntaje: {score}</div>
        <div>Velocidad: x{Math.round(gameSpeed)}</div>
      </div>
      
      {children}
      
      <style>{`
        .obstacle {
          position: absolute;
          width: 200px;
          height: 150px;
          background-size: cover;
          left: 100%;
          animation: moveObstacle ${2 / gameSpeed}s linear forwards; 
        }
        .obstacle.ground {
          bottom: 60px;
        }
        .obstacle.cell.ground {
          bottom: 60px;
        }
        .obstacle.air {
          bottom: 25vh;
        }
        @keyframes moveObstacle {
          0% { 
            left: 100%; 
            transform: translateZ(0);
          }
          100% { 
            left: -800px; 
            transform: translateZ(0);
          }
        }
      `}</style>
      
      {!isGameOver && obstacles.map(obstacle => (
        <div key={obstacle.id}>
          {obstacle.type === 'cell' ? (
            <Cell 
              id={obstacle.id}
              position={obstacle.position}
              handleCollision={handleCollision} 
            />
          ) : (
            <Roca 
              id={obstacle.id}
              position={obstacle.position}
              handleCollision={handleCollision} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Escenario;