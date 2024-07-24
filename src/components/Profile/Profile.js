import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import reviewService from '../../services/reviewService';
import BookCard from '../BookCard';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '' });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await userService.getUserProfile();
        setUser(userData.data);
        const userReviews = await reviewService.getUserReviews();
        setReviews(userReviews.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userService.updateUserProfile(user.username, user.email);
      navigate('/my-reviews');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save Changes
          </Button>
        </Box>
        <Typography component="h2" variant="h6" sx={{ mt: 4 }}>
          Your Reviews
        </Typography>
        <Grid container spacing={4}>
          {reviews.map((review) => (
            <Grid item key={review._id} xs={12} sm={6} md={4}>
              <BookCard book={review} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
