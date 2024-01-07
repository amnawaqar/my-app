import logo from './logo.svg';
import './App.css';
import Tissue from './Tissue';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Samples from './Samples';

function App() {
  return (


        <Router>
        <Routes>
        <Route path="/" element={<Tissue />} />
          <Route path="/samples/:id" element={<Samples />} />
        </Routes>
 
      </Router>
  );
}

export default App;
