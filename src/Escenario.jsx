import React, { useState, useEffect } from 'react';
import './Escenario.css'; 
import Cell from './Cell'; 
import Roca from './Roca'; 
import { useLocation } from 'react-router-dom';

const Escenario = ({ children, handleCollision}) => {
  const location = useLocation();
  const nombreJugador = location.state?.nombre || 'Anónimo';
  const [obstaclePosition, setObstaclePosition] = useState(300); 
  const [obstacleType, setObstacleType] = useState('Roca'); 
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomPosition = Math.floor(Math.random() * (window.innerHeight - 100));
      const newObstacleType = Math.random() < 0.5 ? 'roca' : 'cell';
      setObstaclePosition(randomPosition);
      setObstacleType(newObstacleType);
    }, 3500); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
      setScore(prevScore => prevScore + 5);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationSpeed(1.6); 
    }, 10000); 

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationSpeed(1.4); 
    }, 20000); 

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationSpeed(1.2); 
    }, 30000); 

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationSpeed(1); 
    }, 40000); 

    return () => clearTimeout(timeout);
  }, []);

  

  return (
    <div className="escenario">
      <div className="info" style={{ marginTop: '150px' }}>
        <div>Nombre: {nombreJugador}</div>
        <div>Tiempo: {timeElapsed} seg</div>
        <div>Puntaje: {score}</div>
      </div>
      
      {children}
      
      <style>{`
        .obstacle {
          position: absolute;
          width: 200px;
          height: 150px;
          background-size: cover;
          left: calc(100% - 50px);
          animation: moveObstacle ${animationSpeed}s linear infinite; 
        }
      `}</style>
      
      {obstacleType === 'cell' ? <Cell handleCollision={handleCollision} /> : <Roca handleCollision={handleCollision} />}
    </div>
  );
};

export default Escenario;