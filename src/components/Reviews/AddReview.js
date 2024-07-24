import * as React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import reviewService from '../../services/reviewService';

export default function AddReview() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reviewData = {
      title: data.get('title'),
      author: data.get('author'),
      reviewText: data.get('review'),
      rating: data.get('rating'),
      image: data.get('image')
    };

    try {
      await reviewService.addReview(
        reviewData.title,
        reviewData.author,
        reviewData.reviewText,
        reviewData.rating,
        reviewData.image
      );
      navigate('/my-reviews');
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle error (e.g., display a notification or error message)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Add Book Review
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Book Title"
            name="title"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            label="Image URL"
            name="image"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="review"
            label="Review"
            name="review"
            multiline
            rows={4}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="rating"
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Review
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
