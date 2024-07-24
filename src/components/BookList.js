import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BookCard from './BookCard';
import { useNavigate } from 'react-router-dom';

const books = [
  {
    title: 'The God of the Woods',
    author: 'Liz Moore',
    image: 'https://example.com/image1.jpg',
  },
  {
    title: 'Ask Not',
    author: 'Maureen Callahan',
    image: 'https://example.com/image2.jpg',
  },
  {
    title: "Millie Fleur's Poison Garden",
    author: 'Christy Mandin',
    image: 'https://example.com/image3.jpg',
  },
];

export default function BookList() {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Book Reviews
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/add-review')}
        sx={{ mb: 4 }}
      >
        Add Book Review
      </Button>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item key={book.title} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
