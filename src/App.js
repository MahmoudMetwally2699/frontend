import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container } from '@mui/material';
import theme from './theme';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddReview from './components/Reviews/AddReview';
import EditReview from './components/Reviews/EditReview';
import ReviewList from './components/Reviews/ReviewList';
import PublicReviewList from './components/Reviews/publicReview';
import Profile from './components/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => (
    <AuthProvider>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ background: 'url(https://example.com/your-image.jpg) no-repeat center center fixed', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Router>
                    <NavBar />
                    <Container component="main" sx={{ flex: 1 }}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/add-review" element={<PrivateRoute component={AddReview} />} />
                            <Route path="/edit-review/:id" element={<PrivateRoute component={EditReview} />} />
                            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                            <Route path="/reviews" element={<PublicReviewList />} />
                            <Route path="/my-reviews" element={<PrivateRoute component={ReviewList} />} />
                            <Route path="/" element={<Navigate to="/reviews" />} />
                            <Route path="*" element={<Navigate to="/reviews" />} />
                        </Routes>
                    </Container>
                    <Footer />
                </Router>
            </Box>
        </ThemeProvider>
    </AuthProvider>
);

export default App;
