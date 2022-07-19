import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './views/Dashboard';
import Homepage from './views/Homepage';
import '../public/styles/styles.scss';
import themeParq from '../public/styles/muiTheme';
import AboutPage from './components/AboutPage';
import LandingPage from './views/LandingPage';


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
      <CssBaseline />
      <Routes>
        <Route exact path='/' element={<Homepage />} >
          <Route index element={<LandingPage />} />
          <Route exact path='dashboard' element={<Dashboard />} />
          <Route exact path='about' element={<AboutPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;