import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Signup } from "../components/Signup";
import topoBackground from "../../public/images/topoBackground.png";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import PaidIcon from '@mui/icons-material/Paid';

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  return (
    <>
      <div className="topoAbout" style={{ height: 800 }}>
        <img className="topo" src={topoBackground} width="100%"></img>
        <br></br>
        <Container
          fixed
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            height: "1vh",
            bgcolor: "white",
            maxWidth: "xl",
          }}
        >
          <Box
            id="hero"
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ bgcolor: "inherit" }}
          >
            <Typography
              variant="h2"
              marked="center"
              component="h2"
              sx={{ mb: 14 }}
            >
              Parq like you've never Parqed before
            </Typography>
          </Box>
          {/* <Grid
            container
            spacing={5}
            sx={{
              bgcolor: "inherit",
            }}
          > */}
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <EmojiTransportationIcon fontSize="large"/>
              <Typography
                variant="p"
                marked="center"
                component="h1"
                sx={{ mb: 14 }}
              >
                  Parq helps you find places to park at anytime, anywhere.
                  Simply search your area and find parking anywhere you need it!
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems='center'
              
            >
              <PaidIcon fontSize="large"/>
              <Typography
                variant="p"
                marked="center"
                component="h1"
                sx={{ mb: 14 }}
              >
                Got extra space?  You can rent our your extra parking space and make some extra money! Just make an account and post your listing. 
              </Typography>
            </Box>
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center">

              <Typography
                variant="p"
                marked="center"
                component="h1"
                sx={{ mb: 14 }}
              >
              box3
              </Typography>
              </Box>
          </Grid>
          {/* </Grid> */}
        </Container>
      </div>
    </>
  );
}

export default ProductHowItWorks;

{
  /* <Box
        component="section"
        sx={{ display: 'flex', backgroundImage: 'Application/public/images/topoBackground.png', overflow: 'hidden' }}
      >
      
        <Container
          sx={{
            mt: 10,
            mb: 15,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="/images/topoBackgroundSmall.png"
            alt="curvy lines"
            sx={{
              pointerEvents: 'none',
              position: 'absolute',
              top: -180,
              opacity: 0.7,
            }}
          />
          
          <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          About Parq
          </Typography>
          
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Card sx={item}>
                  <Box sx={number}>1.</Box>
                  <Box
                    component="img"
                    src="/images/book-archway.png"
                    alt="suitcase"
                    sx={image}
                  />
                  <Typography variant="h5" align="center">
                  Find parking anywhere, anytime!
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={item}>
                  <Box sx={number}>2.</Box>
                  <Box
                    component="img"
                    src="/images/topoBackground.png"
                    alt="graph"
                    sx={image}
                  />
                  <Typography variant="h5" align="center">
                  Got empty space?  host a parking spot for extra income.
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={item}>
                  <Box sx={number}>3.</Box>
                  <Box
                    component="img"
                    src="/static/themes/onepirate/productHowItWorks3.svg"
                    alt="clock"
                    sx={image}
                  />
                  <Typography variant="h5" align="center">
                    never worry about parking again!
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </div>
          <Signup />
        </Container>
      </Box> */
}
