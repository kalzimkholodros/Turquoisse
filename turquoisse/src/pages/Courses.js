import React, { useState } from 'react';
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
  TextField,
  InputAdornment,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

const Courses = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Modern React Development',
      description: 'Learn React 18, Redux Toolkit, TypeScript, and Next.js. Build real-world applications with modern best practices.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
      category: 'Frontend',
      rating: 4.8,
      students: 2500,
      duration: '32 hours',
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'Node.js Microservices',
      description: 'Master microservices architecture with Node.js. Learn Docker, Kubernetes, and cloud deployment strategies.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
      category: 'Backend',
      rating: 4.9,
      students: 1800,
      duration: '28 hours',
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'Cloud Security Fundamentals',
      description: 'Learn cloud security best practices for AWS and Azure. Implement secure authentication and protect against common threats.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      category: 'Security',
      rating: 4.7,
      students: 1200,
      duration: '24 hours',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Full-Stack Web Development',
      description: 'Comprehensive course covering both frontend and backend development with modern JavaScript frameworks.',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
      category: 'Full-Stack',
      rating: 4.9,
      students: 3500,
      duration: '45 hours',
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'DevOps Engineering',
      description: 'Learn CI/CD, infrastructure as code, and monitoring. Master tools like Jenkins, Terraform, and Prometheus.',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
      category: 'DevOps',
      rating: 4.8,
      students: 1500,
      duration: '30 hours',
      level: 'Advanced'
    },
    {
      id: 6,
      title: 'Data Structures & Algorithms',
      description: 'Master fundamental data structures and algorithms. Prepare for technical interviews with practical examples.',
      image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d',
      category: 'Computer Science',
      rating: 4.7,
      students: 2200,
      duration: '35 hours',
      level: 'Intermediate'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#40E0D0';
    }
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #40E0D0 30%, #3498db 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Available Courses
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Explore our comprehensive collection of tech courses
          </Typography>

          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search courses by title, description, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              maxWidth: 600,
              mb: 6,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Courses Grid */}
        <Grid container spacing={4}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                  },
                  borderRadius: 2
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.image}
                    alt={course.title}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={course.category}
                        size="small"
                        sx={{
                          backgroundColor: '#40E0D0',
                          color: 'white',
                          mr: 1
                        }}
                      />
                      <Chip
                        label={course.level}
                        size="small"
                        sx={{
                          backgroundColor: getLevelColor(course.level),
                          color: 'white'
                        }}
                      />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} />
                        <Typography variant="body2">{course.rating}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PeopleIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body2">{course.students}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="body2">{course.duration}</Typography>
                      </Box>
                    </Box>
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

export default Courses; 