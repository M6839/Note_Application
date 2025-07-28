
import React from 'react';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<SignUp/>} />
         <Route path="/SignIn" element={<SignIn/>} />
         <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
