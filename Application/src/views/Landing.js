import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from 'axios';
import logo from '../../public/images/blueParq.png';
import topoBackground from '../../public/images/topoBackground.png';
import bookArchway from '../../public/images/book-archway.png';
import hostArchway from '../../public/images/host-archway.png';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoginPopup from '../components/LoginPopup.jsx';
import AboutPage from '../components/About.jsx';
import Host from '../components/Host.jsx';

export default function LandingPage() {
  
  
  // Define state
  const [address, setAddress] = useState('');
  // const [data, setData] = useState({
  //   lat: 34.052235,
  //   lng: -118.243683,
  //   listings: [],
  // });
    
  // Get inital state from local storage
  useEffect(() => {
    setAddress(JSON.parse(window.localStorage.getItem('address')));
  }, []);
  // Persist mode in local storage
  useEffect(() => {
    window.localStorage.setItem('address', address);
  }, [address]);
    
  // Helper functions
  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/api/all', {
        address: address
      })
      .then(res => {
        navigate('dashboard', { state: { address: res.data } });
      })
      .catch(err => {
        console.log(`Error occured in useEffect: ${err}`);
      });
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar className='navBar' style={{ height: '70px' }} sx={{ flexGrow: 1 }}>
        <Button color='inherit' sx={{ flexGrow: 1 }}>
          <Link component={RouterLink} to='dashboard' style={{ textDecoration: 'none' }}>
            <Typography
              variant='h6'
              component='div'
              sx={{
                textTransform: 'none',
                fontWeight: 'light',
                color: '#36454F'
              }}>
                  book
            </Typography>
          </Link>
        </Button>
        <Host />
        <Button>
          <Link component={RouterLink} to='/' style={{textDecoration: 'none'}}>
            <img className='websiteLogo' src={logo} />
          </Link>
        </Button>
        <Button color='inherit' sx={{ flexGrow: 1 }}>
          <Typography
            variant='h6'
            component='div'
            sx={{
              textTransform: 'none',
              fontWeight: 'light',
              color: '#36454F'
            }}>
            <AboutPage />
          </Typography>
        </Button>
        <Button color='inherit' sx={{ flexGrow: 1 }}>
          <Typography
            variant='h6'
            component='div'
            sx={{
              textTransform: 'none',
              fontWeight: 'light',
              color: '#36454F'
            }}>
            <LoginPopup />
          </Typography>
        </Button>
      </AppBar>

      <div className='topoSearch' style={{ height: '350px' }}>
        <img className='topo' src={topoBackground} width='100%'></img>
        <div className='landingSearch'>
          <form onSubmit={handleSubmit}>
            <TextField
              id='standard-search'
              variant='outlined'
              label='city, state, zip code'
              // className={classes.textField}
              value={address}
              size='small'
              onChange={e => setAddress(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon sx={{ color: '#B9D8D8' }} />
                  </InputAdornment>
                )
              }}></TextField>
          </form>
        </div>
      </div>

      <div className='archways' style={{ height: 'calc( 100vh - 440px)' }}>
        <div
          className='leftArch'
          style={{ width: '49%', height: '100%', float: 'left' }}>
          <Link component={RouterLink} to='/dashboard'>
            <button className='leftArchText'>book</button>
          </Link>
          <img className='archway' src={bookArchway} width='100%'></img>
        </div>
        <div
          className='rightArch'
          style={{ width: '50%', height: '100%', float: 'right' }}>
          <Link component={RouterLink} to='/dashboard'>
            <button className='rightArchText'>host</button>
          </Link>
          <img className='archway' src={hostArchway} width='100%'></img>
        </div>
      </div>
    </Container>
  );
}
