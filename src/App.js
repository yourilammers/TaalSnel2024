import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Frontdemo from './components/Frontdemo';
import Pricing from './components/Pricing';	
import Features from './components/Features';
import Feature2 from './components/Feature2';
import Login from './components/Login';  // Assuming you create a Login component
import Dashboard from './components/Dashboard';  // Assuming you create a Dashboard component	
import './App.css';

function App() {
  document.title = 'TaalSnel';

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <Hero />
            <Frontdemo />
            <Features />
            <Feature2 />
            <Pricing />
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
