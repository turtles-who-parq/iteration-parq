import React from 'react';

import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../../public/images/blueParq.png';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { makeStyles } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Maps from '../components/Map';
import { useEffect, useState } from 'react';
import LoginPopup from '../components/LoginPopup.jsx';
import AboutPage from '../components/About.jsx';
import Host from '../components/Host.jsx';
import ParkingSpotTest from '../components/ParkingSpotTest.jsx';

export default function Dashboard() {
  // const useStyles = makeStyles(() => ({
  //   textField: {
  //     width: '98%',
  //     height: '50%',
  //     marginLeft: 'auto',
  //     marginRight: 'auto',
  //     paddingBottom: 0,
  //     marginTop: 0,
  //     fontWeight: 500,
  //     borderRadius: 0
  //   },
  //   overrides: {
  //     border: 0,
  //     borderRadius: 20
  //   },
  //   input: {
  //     color: 'white'
  //   }
  // }));

  // const classes = useStyles();

  const [address, setAddress] = useState('');
  const [zoom, setZoom] = useState(10);
  const [data, setData] = useState({
    lat: 43.65088,
    lng: -79.36576,
    listings: [],
  });
  const [spotElems, setSpotElems] = useState([]);

  const props = {
    data,
    isVisible: true,
    zoom,
  };

  let output;

  useEffect(() => {
    setData(data);
    setZoom(13);
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      console.log('hancleSubmit called');
      output = await axios.post('http://localhost:3000/api/all', {
        address: address,
      });

      setData({ lat: output.data.inputLocation.lat, lng: output.data.inputLocation.lng, listings: output.data.allListings });
      setZoom(13);
    } catch (err) {
      console.log(`Error occured in useEffect: ${err}`);
    }
  };

  if (data.listings[0]) {
    spotFilter();
  }

  async function spotFilter() {
    //calcuate distanceS between user-input location and all listings; filtering out listings within range (10000 meters)
    let listings = [...data.listings];
    let origin = { ...data };
    delete origin.listings;
    try {
      const requests = listings.map(async (listing, i) => {
        let distance = await calculateDistance(origin, listing.coordinates);

        return distance < 100000 ? <ParkingSpotTest key={i} info={listing} {...props} /> : undefined;
      });

      let array = await Promise.all(requests);

      setSpotElems(array.filter(e => e !== undefined)); // Waiting for all the requests to get resolved.
    } catch (e) {
      console.log('spotFilter erro==>', e);
    }
  }

  async function calculateDistance(origin, destination) {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return;
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    return results.routes[0].legs[0].distance.value;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='navBar' style={{ height: '70px' }} sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Button color='inherit' sx={{ flexGrow: 1 }}>
              <Typography
                variant='h6'
                component='div'
                sx={{
                  textTransform: 'none',
                  fontWeight: 'light',
                  color: '#36454F',
                }}
              >
                book
              </Typography>
            </Button>
            <Button color='inherit' sx={{ flexGrow: 1 }}>
              <Typography
                variant='h6'
                component='div'
                sx={{
                  textTransform: 'none',
                  fontWeight: 'light',
                  color: '#36454F',
                }}
              >
                <Host />
              </Typography>
            </Button>
            <Link component={RouterLink} to='/'>
              <Button>
                <img className='websiteLogo' src={logo} />
              </Button>
            </Link>
            <Button color='inherit' sx={{ flexGrow: 1 }}>
              <Typography
                variant='h6'
                component='div'
                sx={{
                  textTransform: 'none',
                  fontWeight: 'light',
                  color: '#36454F',
                }}
              >
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
                  color: '#36454F',
                }}
              >
                <LoginPopup />
              </Typography>
            </Button>
          </Toolbar>
        </Box>
      </div>
      <div className='filterBar' style={{ height: '40px' }} sx={{ flexGrow: 1 }}>
        <div className='leftFilter' style={{ width: '30%', float: 'left', marginLeft: '10px' }}>
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
                ),
              }}
            ></TextField>
          </form>
        </div>

        <div className='rightFilter' style={{ width: '60%', float: 'right' }}>
          <Button className='filterPrice' color='inherit' sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component='div'
              sx={{
                textTransform: 'none',
                fontWeight: 'light',
                color: '#36454F',
              }}
            >
              price
            </Typography>
          </Button>
          <Button className='filterPrice' color='inherit' sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component='div'
              sx={{
                textTransform: 'none',
                fontWeight: 'light',
                color: '#36454F',
              }}
            >
              size
            </Typography>
          </Button>
          <Button className='filterPrice' color='inherit' sx={{ width: 10 }}>
            <Typography
              // variant="h6"
              component='div'
              sx={{
                textTransform: 'none',
                fontWeight: 'light',
                color: '#36454F',
              }}
            >
              type
            </Typography>
          </Button>
        </div>
      </div>
      <div className='mapAndTiles' style={{ height: 'calc( 100vh - 145px )' }}>
        <div className='leftMap' style={{ width: '49%', height: '100%', float: 'left' }}>
          <Maps className='map' {...props} />
        </div>
        <div className='rightTiles' style={{ width: '50%', height: '100%', float: 'right' }}>
          {spotElems}
        </div>
      </div>
    </div>
  );
}
