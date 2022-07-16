import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import axios from 'axios';
import logo from '../../public/images/blueParq.png';
import topoBackground from '../../public/images/topoBackground.png';
import bookArchway from '../../public/images/book-archway.png';
import hostArchway from '../../public/images/host-archway.png';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import LoginPopup from '../components/LoginPopup.jsx';
import AboutPage from '../components/About.jsx';
import Host from '../components/Host.jsx';
import NavBar from '../components/NavBar';

export default function LandingPage() {

  const [address, setAddress] = useState('');
  // const [data, setData] = useState({
  //   lat: 34.052235,
  //   lng: -118.243683,
  //   listings: [],
  // });

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/api/all', {
        address: address
      })
      .then(res => {
        navigate('dashboard', { state: res.data });
      })
      .catch(err => {
        console.log(`Error occured in useEffect: ${err}`);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* <div className='navBar' style={{ height: '70px' }} sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Button>
              <img className='websiteLogo' src={logo} />
            </Button>
            <Box sx={{ width: '80%'}}>
              <Button color='inherit'>
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
              <Button sx={{ flexGrow: 1 }}>
                <Link component={RouterLink} to='about' style={{ textDecoration: 'none' }}>
                  <Typography
                    variant='h6'
                    component='div'
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'light',
                      color: '#36454F'
                    }}>
                    about
                  </Typography>
                </Link>
              </Button>
              <AboutPage />
              <LoginPopup />
            </Box>
          </Toolbar>
        </Box>
      </div> */}

      <NavBar />

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
    </div>
  );
}
