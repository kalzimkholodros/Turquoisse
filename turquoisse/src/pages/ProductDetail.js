import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Divider,
  Avatar,
  Paper,
  Grid,
  TextField,
  useTheme,
  Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Normalde bu veriyi API'den alacağız
    // Şimdilik Navbar'daki products array'ini kullanıyoruz
    const products = [
      { id: 1, name: 'React Development Kit', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee', price: '$99' },
      { id: 2, name: 'Node.js Starter Pack', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479', price: '$149' },
      { id: 3, name: 'TypeScript Bundle', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', price: '$199' },
      { id: 4, name: 'AWS Cloud Package', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', price: '$299' },
      { id: 5, name: 'Docker Essentials', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9', price: '$399' },
      { id: 6, name: 'Security Toolkit', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb', price: '$499' },
      { id: 7, name: 'GraphQL Masterclass', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd', price: '$199' },
      { id: 8, name: 'Vue.js Complete', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479', price: '$149' },
      { id: 9, name: 'MongoDB Pro', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee', price: '$249' },
      { id: 10, name: 'Redux Toolkit', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', price: '$179' },
      { id: 11, name: 'Next.js Bundle', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9', price: '$299' },
      { id: 12, name: 'Testing Suite', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', price: '$199' },
      { id: 13, name: 'CI/CD Package', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb', price: '$399' },
      { id: 14, name: 'Python Dev Kit', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd', price: '$249' },
      { id: 15, name: 'Angular Complete', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479', price: '$299' },
      { id: 16, name: 'DevOps Tools', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee', price: '$499' },
      { id: 17, name: 'Kubernetes Set', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', price: '$399' },
      { id: 18, name: 'Firebase Bundle', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9', price: '$299' }
    ];

    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        description: 'Complete development kit for building modern applications. Includes best practices, component libraries, and performance optimization tools.',
        rating: 4.5,
        reviews: [
          { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent product, really helped me improve my skills!', date: '2024-03-15' },
          { id: 2, user: 'Jane Smith', rating: 4, comment: 'Great toolkit, but could use more advanced examples.', date: '2024-03-14' }
        ],
        features: [
          'Modern development practices and patterns',
          'Component library with 50+ components',
          'Performance optimization tools',
          'State management solutions',
          'Testing utilities',
          'Documentation and examples'
        ]
      });
    }
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Burada yorum ve puanı API'ye gönderecek fonksiyon gelecek
    console.log({ rating, comment });
    setRating(0);
    setComment('');
  };

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Product not found!</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Ürün Resmi ve Detayları */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              height: '400px',
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                ({product.reviews.length} reviews)
              </Typography>
            </Box>
            <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{
                bgcolor: '#40E0D0',
                '&:hover': { bgcolor: '#2EC4B6' },
                mb: 3
              }}
            >
              Add to Cart
            </Button>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Özellikler */}
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {product.features.map((feature, index) => (
                <Typography component="li" key={index} paragraph>
                  {feature}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Yorumlar ve Değerlendirmeler */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Reviews
            </Typography>
            
            {/* Yorum Formu */}
            <Box component="form" onSubmit={handleSubmitReview} sx={{ mb: 4 }}>
              <Box sx={{ mb: 2 }}>
                <Typography component="legend">Your Rating</Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                />
              </Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: '#40E0D0',
                  '&:hover': { bgcolor: '#2EC4B6' }
                }}
              >
                Submit Review
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Mevcut Yorumlar */}
            {product.reviews.map((review) => (
              <Box key={review.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ mr: 2, bgcolor: '#40E0D0' }}>
                    {review.user.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.user}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ ml: 7 }}>
                  {review.comment}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 