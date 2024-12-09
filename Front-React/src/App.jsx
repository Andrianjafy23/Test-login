import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Login />} /> {/* Si l'utilisateur tente d'accéder à une route non définie */}
    </Routes>
  );
};

const Root = () => (
  <Router>  {/* Enveloppement du composant App avec le Router */}
    <App />
  </Router>
);

export default Root;
