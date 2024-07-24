import * as React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import reviewService from '../../services/reviewService';

export default function EditReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [review, setReview] = React.useState({
    title: '',
    author: '',
    reviewText: '',
    rating: 0,
    image: ''
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    async function fetchReview() {
      try {
        const response = await reviewService.getReviewById(id);
        setReview(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching review:', error);
        setError('Error fetching review');
        setLoading(false);
      }
    }
    fetchReview();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await reviewService.updateReview(id, review.title, review.author, review.reviewText, review.rating, review.image);
      navigate('/my-reviews');
    } catch (error) {
      console.error('Error updating review:', error);
      setError('Error updating review');
    }
  };

  const handleDelete = async () => {
    try {
      await reviewService.deleteReview(id);
      navigate('/my-reviews');
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Error deleting review');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
          Edit Book Review
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Book Title"
            name="title"
            value={review.title}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            value={review.author}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            label="Image URL"
            name="image"
            value={review.image}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="reviewText"
            label="Review"
            name="reviewText"
            value={review.reviewText}
            onChange={handleChange}
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
            value={review.rating}
            onChange={handleChange}
            inputProps={{ min: 1, max: 5 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{ mt: 1, mb: 2 }}
          >
            Delete Review
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
