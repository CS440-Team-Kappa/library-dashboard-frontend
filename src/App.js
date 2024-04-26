import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/LoginPage';
import CreateAccount from './CreateAccount/CreateAccount';

function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard user={user} onLogout={handleLogout} /> } />
          <Route path="/login" element={<Login onLogin={handleLogin} /> } />
          <Route path='/createaccount' element={<CreateAccount /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
