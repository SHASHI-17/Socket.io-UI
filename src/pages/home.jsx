import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Typography } from '@mui/material';

const Home = () => {
  return (
  <Typography p={'2rem'} bgcolor={'rgba(247,247,247,1)'} variant='h5' height={'100%'} textAlign={'center'} fontFamily={'cursive'}>
    Select a friend to chat
  </Typography>
  )
  }
export default AppLayout(Home); 
