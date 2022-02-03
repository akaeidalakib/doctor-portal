import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from '../../../images/doctor.png'
import bg from '../../../images/appointment-bg.png'
import { Button, Typography } from '@mui/material';

const appointmentBg = {
  background: `url(${bg})`,
  backgroundColor: 'rgba(31, 40, 53, 0.8)',
  backgroundBlendMode: 'darken, luminosity',
  marginTop: 150
}
const AppoinmentBanner = () => {
    return (
        <Box style={appointmentBg} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
           <img 
           style={{width: 400, marginTop: '-110px'}}
           src={doctor} alt="doctor">
               
           </img>
          </Grid>
          <Grid item xs={12} md={6} sx={{
            display: 'flex', justifyContent: 'flex-start',
            alignItems: 'center',
            textAlign: 'left' }}>
            <Box>
            <Typography sx={{ mb: 2 }} variant="h5" style={{ color: '#72EDF7'}}>Appointment</Typography>
          <Typography sx={{ mb: 2 }} variant="h4" style={{ color: 'white'}}>Make An Appointment Today</Typography>
            <Typography sx={{ mb: 2 }} variant="h6" style={{ color: 'white', fontSize: 14, fontWeight: 300 }}>
              Blending modes should be defined in the same order as the background-image property. If the blending modes'Blending modes should be defined in the same order as the background-image property. If the blending modes'  </Typography>
          <Button variant="contained">Learn more</Button>
          </Box>
          </Grid>
        </Grid>
      </Box>
    );
};

export default AppoinmentBanner;