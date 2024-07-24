import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200], textAlign: 'center' }}>
      <Typography variant="body1">© 2024 Book Review Platform</Typography>
    </Box>
  );
};

export default Footer;
