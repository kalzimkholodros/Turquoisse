import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import { motion } from 'framer-motion';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <CodeIcon sx={{ fontSize: 40, color: '#40E0D0' }} />,
      title: 'Full-Stack Development',
      description: 'Master modern web development with React, Node.js, and cloud-native technologies. Build scalable applications from start to finish.'
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40, color: '#40E0D0' }} />,
      title: 'Cloud Architecture',
      description: 'Learn cloud-native patterns with AWS, Azure, and GCP. Design resilient systems using microservices and containerization.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#40E0D0' }} />,
      title: 'Cybersecurity',
      description: 'Implement robust security practices in your applications. From authentication to encryption, protect your systems against modern threats.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', pt: 4 }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #40E0D0 30%, #3498db 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Master Modern
              <Typography 
                component="span" 
                variant="h2" 
                sx={{ 
                  fontWeight: 700,
                  display: 'block',
                  background: 'linear-gradient(45deg, #3498db 30%, #40E0D0 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Software Engineering
              </Typography>
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Comprehensive courses in full-stack development, cloud architecture, and cybersecurity. 
              Learn from industry experts and build real-world projects.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#40E0D0',
                '&:hover': { backgroundColor: '#2EC4B6' },
                px: 4,
                py: 1.5,
                borderRadius: 2
              }}
              onClick={() => navigate('/courses')}
            >
              Explore Courses
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="Modern Development"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                objectFit: 'cover',
                borderRadius: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            />
          </Grid>
        </Grid>

        {/* Features Section */}
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            mb: 6,
            background: 'linear-gradient(45deg, #40E0D0 30%, #3498db 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          What You'll Learn
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.paper,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  },
                  borderRadius: 2
                }}
              >
                {feature.icon}
                <Typography variant="h5" sx={{ my: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #40E0D0 30%, #3498db 90%)',
            borderRadius: 4,
            color: 'white'
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of developers who have transformed their careers with our courses.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: '#40E0D0',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
            onClick={() => navigate('/about')}
          >
            Learn More
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage; 