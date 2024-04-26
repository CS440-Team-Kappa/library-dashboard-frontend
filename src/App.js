import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/LoginPage';
import CreateAccount from './CreateAccount/CreateAccount';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard /> } />
          <Route path="/login" element={<Login /> } />
          <Route path='/createaccount' element={<CreateAccount /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
