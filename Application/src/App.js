import Map from '@mui/icons-material/Map';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import LandingPage from './views/LandingPage.jsx';
import '../public/stylesheets/styles.scss';

const App = (props) => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Routes>
      </main>
    </div>
  );
};

export default App;