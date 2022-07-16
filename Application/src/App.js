import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Dashboard from './views/Dashboard';
import LandingPage from './views/LandingPage';
import '../public/styles/styles.scss';
import themeParq from '../public/styles/muiTheme';



const App = () => {
  // Define app state
  const [ mode, setMode ] = useState('light');
  const [ auth, setAuth ] = useState(false);
  const [ user, setUser ] = useState();

  // // Get inital state from local storage
  // useEffect(() => {
  //   setMode(JSON.parse(window.localStorage.getItem('mode')));
  //   setUser(JSON.parse(window.localStorage.getItem('user')));
  // }, []);
  // // Persist mode in local storage
  // useEffect(() => {
  //   window.localStorage.setItem('mode', mode);
  // }, [mode]);
  // // Persist user in local storage
  // useEffect(() => {
  //   window.localStorage.setItem('user', user);
  // }, [user]);

  // Change between light and dark mode
  const theme = themeParq(mode);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='dashboard' element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;