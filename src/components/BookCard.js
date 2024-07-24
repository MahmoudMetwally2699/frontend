import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edit-review/${book._id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={book.image}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.reviewText}
          </Typography>
          <Rating name="read-only" value={book.rating} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
