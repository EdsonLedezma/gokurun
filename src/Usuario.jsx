import React, { useState, useEffect } from 'react';
import './Usuario.css';
import { useNavigate } from 'react-router-dom';

const Usuario = () => {
  const [nombre, setNombre] = useState('');
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/juego', { state: { nombre } });
  };

  useEffect(() => {
    const obtenerRegistros = async () => {
      try {
        const response = await fetch('https://getpantry.cloud/apiv1/pantry/6df0687d-d6bc-4335-b99f-f876ee81c71f/basket/record');
        if (!response.ok) {
          throw new Error('Error al obtener los registros de la API');
        }
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setRecords(data);
      } catch (error) {
        console.error('Error al obtener los registros:', error); 
      }
    };

    obtenerRegistros();
  }, []);

  return (
    <div className="Usuario">
      <div><h1>Goku Run Game</h1></div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={handleChange}
          placeholder="Ingresa tu nombre"
          className="Usuario-input"
        />
        <button className="Usuario-button">Jugar</button>
      </form>
      <ul className="list">
        {Object.entries(records).map(([key, value]) => (
          <ol key={key}>{value}</ol>
        ))}
      </ul>
    </div>
  );
};

export default Usuario;
