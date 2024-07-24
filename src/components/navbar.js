import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    console.log('NavBar rendered. Authenticated:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Review Platform
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => navigate('/add-review')}>ADD Book Review</Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
