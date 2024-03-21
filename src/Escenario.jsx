import React, { useState, useEffect } from 'react';
import './Escenario.css'; 
import Cell from './Cell'; 
import Roca from './Roca'; 

const Escenario = ({ children }) => {
  const [obstaclePosition, setObstaclePosition] = useState(300); 
  const [obstacleType, setObstacleType] = useState('cell'); 

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPosition = Math.floor(Math.random() * (window.innerHeight - 150));
      const newObstacleType = Math.random() < 0.5 ? 'roca' : 'cell';
      setObstaclePosition(randomPosition);
      setObstacleType(newObstacleType);
    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="escenario">
      {children}
      {obstacleType === 'cell' ? <Cell /> : <Roca />}
    </div>
  );
};

export default Escenario;
