import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Navbar from './components/Navbar';

function App() {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <TransactionList /> : <Navigate to="/login" />} />
        <Route path="/add" element={isAuthenticated ? <AddTransaction /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
