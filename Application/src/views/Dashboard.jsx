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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';

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
  const [zoom, setZoom] = useState(5);
  const [data, setData] = useState({
    lat: 43.65088,
    lng: -79.36576,
    listings: [],
  });
  const [homeMarker, setHomemarker] = useState();
  const [spotElems, setSpotElems] = useState([]);
  const [distance, setDistance] = useState(500);

  const props = {
    data,
    //isVisible: true,
    zoom,
    homeMarker,
  };

  let output;

  useEffect(() => {
    axios.get('/api/allListings').then(response => {
      console.log('response==>', response);
      const allListings = response.data.allListings;
      setData({ ...data, listings: allListings });
    });
  }, []);

  const handleChange = event => {
    setDistance(event.target.value);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      console.log('handleSubmit called');
      output = await axios.post('/api/input', {
        address,
      });
      console.log(output);
      setData({ ...data, lat: output.data.inputLocation.lat, lng: output.data.inputLocation.lngs });
      setZoom(15);
      setHomemarker(true);
      spotFilter();
    } catch (err) {
      console.log(`handleSubmit error==>`, err.response);
    }
  };

  async function spotFilter() {
    //calcuate distanceS between user-input location and all listings; filtering out listings within range (10000 meters)

    // const listings = [...data.listings];
    // const origin = { ...data };
    // delete origin.listings;
    try {
      let result = await axios.get('/api/allListings');

      const listings = result.data.allListings;

      const requests = listings.map(async (listing, i) => {
        const range = await calculateDistance(origin, listing.coordinates);

        return range < distance ? listing : undefined;
      });

      let array = await Promise.all(requests);

      array = array.filter(e => e !== undefined);

      setData({ ...data, listings: array });

      setSpotElems(array.map((e, i) => <ParkingSpotTest key={i} info={e} {...props} />)); // Waiting for all the requests to get resolved.
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
    <>
      <div className='filterBar' style={{ height: '100px' }} sx={{ flexGrow: 1 }}>
        <div className='leftFilter' style={{ width: '60%', float: 'left', marginLeft: '10px' }}>
          <Typography marginLeft={'2px'} color='text.primary'>
            Please enter your location to see nearby parking spots.
          </Typography>
          <Grid container justifyContent='start' alignItems='center' style={{ paddingBottom: '7vh' }}>
            <Grid item sx={6}>
              <form>
                <TextField
                  style={{ width: '400px' }}
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
            </Grid>
            <Grid item sx={3}>
              <FormControl sx={{ m: 1, minWidth: 100 }} size='small' paddingTop={'-10px'}>
                <InputLabel id='demo-simple-select-autowidth-label'>Distance</InputLabel>
                <Select style={{ height: '44px' }} labelId='demo-simple-select-autowidth-label' id='demo-simple-select-autowidth' value={distance} onChange={handleChange} autowidth label='Age'>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={500}>500 meters</MenuItem>
                  <MenuItem value={1000}>1000 meters</MenuItem>
                  <MenuItem value={1500}>1500 meters</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={3}>
              <Button onClick={handleSubmit} variant='contained' size='medium'>
                <Typography
                  // component='div'
                  sx={{
                    textTransform: 'none',
                    fontWeight: '600',
                    color: 'white',
                    fontSize: '9',
                  }}
                >
                  search
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>

        <div className='rightFilter' style={{ width: '40%', float: 'right' }}>
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
    </>
  );
}
