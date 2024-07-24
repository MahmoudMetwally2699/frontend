import * as React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import BookCard from '../BookCard';
import reviewService from '../../services/reviewService';

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  
  React.useEffect(() => {
    async function fetchUserReviews() {
      try {
        const response = await reviewService.getUserReviews();
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching user reviews:', error);
      }
    }
    fetchUserReviews();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          My Book Reviews
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
