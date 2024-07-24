import * as React from 'react';
import { Grid, Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookCard from '../BookCard';
import reviewService from '../../services/reviewService';

export default function PublicReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await reviewService.getReviews();
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Book Reviews
        </Typography>
        
      </Box>
      <Grid container spacing={4}>
        {reviews.map((review) => (
          <Grid item key={review._id} xs={12} sm={6} md={4}>
            <BookCard book={review} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
