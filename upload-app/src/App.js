import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Notfound from './pages/NotFound';
import Signup from './pages/Signup';
import User from './pages/User';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="*" element={<Notfound/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
