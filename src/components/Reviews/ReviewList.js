import * as React from 'react';
import { Grid, Container, Typography, Box, Pagination } from '@mui/material';
import BookCard from '../BookCard';
import reviewService from '../../services/reviewService';

export default function ReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchUserReviews = async (page) => {
    try {
      const response = await reviewService.getUserReviews(page);
      setReviews(response.data.reviews);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };

  React.useEffect(() => {
    fetchUserReviews(currentPage);
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
    </Container>
  );
}
