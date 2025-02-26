import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Paper,
  useTheme
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';

const About = () => {
  const theme = useTheme();

  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Founder & Instructor',
      avatar: '/team1.jpg',
      description: '10+ years of software development experience'
    },
    {
      name: 'Emily Davis',
      role: 'Content Developer',
      avatar: '/team2.jpg',
      description: 'Technical writing and education specialist'
    },
    {
      name: 'Michael Johnson',
      role: 'Frontend Developer',
      avatar: '/team3.jpg',
      description: 'React and TypeScript expert'
    }
  ];

  const stats = [
    { icon: <CodeIcon />, value: '1000+', label: 'Hours of Content' },
    { icon: <GroupIcon />, value: '5000+', label: 'Students' },
    { icon: <SchoolIcon />, value: '50+', label: 'Courses' }
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* Mission Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Our Mission
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Making modern web technologies accessible to everyone and training the developers of tomorrow.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.paper,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Box sx={{ color: '#40E0D0', mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Team Section */}
        <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>
          Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.paper,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    mb: 2,
                    border: '4px solid #40E0D0'
                  }}
                />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
                <Typography color="text.secondary">
                  {member.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 