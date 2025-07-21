import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import CuponesDisponibles from './CuponesDisponibles'; // si ya lo creaste
// import Perfil from './Perfil'; // si luego lo deseas

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Dashboard />} />
        <Route path="/cupones" element={<CuponesDisponibles />} />
        {/* <Route path="/perfil" element={<Perfil />} /> */}
      </Routes>
    </Router>
  );
}

export default App;