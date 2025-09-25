import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Login from './Components/Home/Login';
import Dashboard from './Dashboard';

// import Perfil from './Perfil'; // si luego lo deseas

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Dashboard />} />

        {/* <Route path="/perfil" element={<Perfil />} /> */}
      </Routes>
    </Router>
  );
}

export default App;