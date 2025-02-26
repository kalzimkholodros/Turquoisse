import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  useTheme
} from '@mui/material';

const Blog = () => {
  const theme = useTheme();

  const blogPosts = [
    {
      title: 'Getting Started with Machine Learning using TensorFlow',
      description: 'A comprehensive guide to building your first neural network with TensorFlow 2.0 and implementing basic image classification.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
      date: 'March 15, 2024',
      category: 'Machine Learning'
    },
    {
      title: 'Building Scalable Microservices with Docker and Kubernetes',
      description: 'Learn how to containerize your applications and orchestrate them using Kubernetes for production-grade deployments.',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
      date: 'March 12, 2024',
      category: 'DevOps'
    },
    {
      title: 'Advanced Data Structures in Python',
      description: 'Deep dive into implementing complex data structures like Red-Black trees and B+ trees in Python with real-world applications.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
      date: 'March 10, 2024',
      category: 'Python'
    },
    {
      title: 'Real-time Analytics with Apache Kafka and Spark',
      description: 'Building a real-time data pipeline for processing millions of events per second using Kafka streams and Spark processing.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      date: 'March 8, 2024',
      category: 'Big Data'
    },
    {
      title: 'Implementing Authentication with JWT and OAuth2',
      description: 'Step-by-step guide to securing your web applications using JSON Web Tokens and OAuth2 with practical examples.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb',
      date: 'March 5, 2024',
      category: 'Security'
    },
    {
      title: 'Building AI-Powered Chatbots with OpenAI GPT',
      description: 'Learn to create intelligent conversational agents using OpenAI\'s GPT models and integrate them into your applications.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      date: 'March 1, 2024',
      category: 'AI'
    }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Tech Blog
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Latest articles on cutting-edge technologies and development practices
          </Typography>
        </Box>

        {/* Blog Posts Grid */}
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={post.category}
                        size="small"
                        sx={{
                          backgroundColor: '#40E0D0',
                          color: 'white',
                          mr: 1
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {post.date}
                      </Typography>
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog; 