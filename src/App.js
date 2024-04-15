import React from 'react';
import { BrowserRouter as Router, Route, Routes , useNavigate} from 'react-router-dom';
import Juego from './Juego';
import Usuario from './Usuario';

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Usuario navigate={navigate} />} />
      <Route path="/juego" element={<Juego />} />
      
    </Routes>
  );
}

export default App;
