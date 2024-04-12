import React, { useState } from 'react';

const Usuario = ({ onStart }) => {
  const [nombre, setNombre] = useState('');

  const handleChange = (event) => {
    setNombre(event.target.value);
  };

  const handleClick = () => {
    onStart(nombre);
  };

  return (
    <div>
      <input type="text" value={nombre} onChange={handleChange} placeholder="Ingresa tu nombre" />
      <button onClick={handleClick}>Jugar</button>
      
    </div>
  );
};

export default Usuario;
