import * as React from 'react';
import { Grid, Container, Typography, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import BookCard from '../BookCard';
import reviewService from '../../services/reviewService';

export default function PublicReviewList() {
  const [reviews, setReviews] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await reviewService.getReviews(page, search);
        setReviews(response.data.reviews);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
    fetchReviews();
  }, [page, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          Book Reviews
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ width: '30%' }}
        />
      </Box>
      <Grid container spacing={4}>
        {reviews.map((review) => (
          <Grid item key={review._id} xs={12} sm={6} md={4}>
            <BookCard book={review} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}
