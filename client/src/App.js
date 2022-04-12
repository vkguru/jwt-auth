import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { toast } from "react-toastify";

import './App.css';
import "react-toastify/dist/ReactToastify.css";

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

toast.configure();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + 'verify', {
        method: "GET",
        headers: {token: localStorage.token}
      })

      const parsedRes = await res.json();
      parsedRes === true? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path="login" element={!isAuthenticated? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" replace={true} />} />
            <Route path="register" element={!isAuthenticated? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" replace={true} />} />
            <Route path="dashboard" element={isAuthenticated? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" replace={true} />} />
          </Routes>
          
        </div>
      </Router>
    </>
  );
}

export default App;
