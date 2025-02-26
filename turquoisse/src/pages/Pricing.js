import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Chip
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StarsIcon from '@mui/icons-material/Stars';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupIcon from '@mui/icons-material/Group';
import StorageIcon from '@mui/icons-material/Storage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import UpdateIcon from '@mui/icons-material/Update';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const Pricing = () => {
  const theme = useTheme();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      title: 'Gold',
      icon: <StarsIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
      price: isAnnual ? 499 : 49,
      color: '#FFD700',
      features: [
        { text: '5 Team Members', icon: <GroupIcon /> },
        { text: '50GB Storage', icon: <StorageIcon /> },
        { text: 'Email Support', icon: <SupportAgentIcon /> },
        { text: '10 Projects', icon: <CloudUploadIcon /> },
        { text: 'Basic Analytics', icon: <SpeedIcon /> }
      ],
      buttonVariant: 'outlined'
    },
    {
      title: 'Platinum',
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40, color: '#E5E4E2' }} />,
      price: isAnnual ? 999 : 99,
      color: '#E5E4E2',
      features: [
        { text: '15 Team Members', icon: <GroupIcon /> },
        { text: '200GB Storage', icon: <StorageIcon /> },
        { text: '24/7 Support', icon: <SupportAgentIcon /> },
        { text: 'Unlimited Projects', icon: <CloudUploadIcon /> },
        { text: 'Advanced Analytics', icon: <SpeedIcon /> },
        { text: 'Enhanced Security', icon: <SecurityIcon /> },
        { text: 'Priority Updates', icon: <UpdateIcon /> }
      ],
      buttonVariant: 'contained',
      popular: true
    },
    {
      title: 'Diamond',
      icon: <DiamondIcon sx={{ fontSize: 40, color: '#B9F2FF' }} />,
      price: isAnnual ? 1999 : 199,
      color: '#B9F2FF',
      features: [
        { text: 'Unlimited Team Members', icon: <GroupIcon /> },
        { text: '1TB Storage', icon: <StorageIcon /> },
        { text: 'Dedicated Support', icon: <SupportAgentIcon /> },
        { text: 'Unlimited Everything', icon: <CloudUploadIcon /> },
        { text: 'Enterprise Analytics', icon: <SpeedIcon /> },
        { text: 'Advanced Security', icon: <SecurityIcon /> },
        { text: 'Early Access Updates', icon: <UpdateIcon /> },
        { text: 'Custom Integrations', icon: <IntegrationInstructionsIcon /> }
      ],
      buttonVariant: 'outlined'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #40E0D0 30%, #B9F2FF 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Choose Your Perfect Plan
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Get started with our flexible pricing options
        </Typography>

        {/* Billing Toggle */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={6}>
          <Typography color={isAnnual ? 'text.secondary' : 'text.primary'}>Monthly</Typography>
          <Switch
            checked={isAnnual}
            onChange={() => setIsAnnual(!isAnnual)}
            sx={{
              mx: 2,
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#40E0D0'
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#40E0D0'
              }
            }}
          />
          <Typography color={isAnnual ? 'text.primary' : 'text.secondary'}>
            Annual
            <Chip
              label="Save 20%"
              size="small"
              sx={{
                ml: 1,
                backgroundColor: '#40E0D0',
                color: 'white',
                height: 20,
                '& .MuiChip-label': {
                  px: 1,
                  fontSize: '0.625rem'
                }
              }}
            />
          </Typography>
        </Box>
      </Box>

      {/* Pricing Cards */}
      <Grid container spacing={4} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.title}>
            <Paper
              elevation={plan.popular ? 12 : 4}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)'
                },
                border: plan.popular ? '2px solid #40E0D0' : 'none'
              }}
            >
              {plan.popular && (
                <Chip
                  label="Most Popular"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 24,
                    backgroundColor: '#40E0D0',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              )}

              <Box display="flex" alignItems="center" mb={3}>
                {plan.icon}
                <Typography variant="h5" component="h2" ml={2} fontWeight="bold">
                  {plan.title}
                </Typography>
              </Box>

              <Box mb={4}>
                <Typography variant="h3" component="p" fontWeight="bold">
                  ${plan.price}
                  <Typography component="span" variant="h6" color="text.secondary">
                    /{isAnnual ? 'year' : 'month'}
                  </Typography>
                </Typography>
              </Box>

              <List sx={{ mb: 4, flexGrow: 1 }}>
                {plan.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon sx={{ color: '#40E0D0' }} />
                    </ListItemIcon>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {React.cloneElement(feature.icon, { sx: { color: plan.color, fontSize: 20 } })}
                    </ListItemIcon>
                    <ListItemText primary={feature.text} />
                  </ListItem>
                ))}
              </List>

              <Button
                variant={plan.buttonVariant}
                size="large"
                fullWidth
                sx={{
                  mt: 'auto',
                  py: 1.5,
                  backgroundColor: plan.buttonVariant === 'contained' ? '#40E0D0' : 'transparent',
                  borderColor: '#40E0D0',
                  color: plan.buttonVariant === 'contained' ? 'white' : '#40E0D0',
                  '&:hover': {
                    backgroundColor: plan.buttonVariant === 'contained' ? '#2EC4B6' : 'rgba(64, 224, 208, 0.1)',
                    borderColor: '#40E0D0'
                  }
                }}
              >
                Get Started
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Additional Info */}
      <Box textAlign="center" mt={8}>
        <Typography variant="body1" color="text.secondary">
          All plans include: Basic features, Community support, and Regular updates
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Need a custom plan? <Button color="primary">Contact us</Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Pricing; 