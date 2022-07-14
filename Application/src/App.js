import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import LandingPage from './views/LandingPage';
import '../public/stylesheets/styles.scss';

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={LandingPage} />
      <Route exact path='dashboard' element={Dashboard} />
    </Routes>
  );
};

export default App;