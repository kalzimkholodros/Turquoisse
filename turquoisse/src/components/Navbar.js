import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Stack,
  useTheme,
  InputBase,
  Paper,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DiamondIcon from '@mui/icons-material/Diamond';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SchoolIcon from '@mui/icons-material/School';

const navItems = [
  { text: 'Home', icon: <HomeIcon sx={{ fontSize: '16px', mr: 0.5 }} />, path: '/' },
  { text: 'About us', icon: <InfoIcon sx={{ fontSize: '16px', mr: 0.5 }} />, path: '/about' },
  { text: 'Blog', icon: <ArticleIcon sx={{ fontSize: '16px', mr: 0.5 }} />, path: '/blog' },
  { text: 'Courses', icon: <SchoolIcon sx={{ fontSize: '16px', mr: 0.5 }} />, path: '/courses' },
  { text: 'Pricing', icon: <LocalOfferIcon sx={{ fontSize: '16px', mr: 0.5 }} />, path: '/pricing' }
];

const Navbar = ({ toggleSidebar, darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [productsAnchorEl, setProductsAnchorEl] = useState(null);
  const searchRef = useRef(null);

  // Örnek ürünler - normalde database'den gelecek
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

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const response = await fetch(`http://localhost:5000/api/search?q=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleResultClick = (result) => {
    navigate(`/subject/${result.slug}`);
    handleSearchClose();
  };

  const handleProductsMouseEnter = (event) => {
    setProductsAnchorEl(event.currentTarget);
  };

  const handleProductsMouseLeave = () => {
    setProductsAnchorEl(null);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
    setProductsAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: '40px', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1000px' }}>
          <IconButton
            size="small"
            edge="start"
            aria-label="menu"
            sx={{ color: theme.palette.text.primary }}
            onClick={toggleSidebar}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <DiamondIcon sx={{ color: theme.palette.text.primary, fontSize: '18px' }} />
          </Box>

          <Stack 
            direction="row" 
            spacing={0.5} 
            sx={{ 
              flexGrow: 1, 
              justifyContent: 'center',
              '& .MuiButton-root': {
                minWidth: 'auto',
                px: 1.5,
                py: 0.25,
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            {navItems.map((item) => (
              <Button 
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{ 
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: darkMode 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(64, 224, 208, 0.1)'
                  }
                }}
              >
                {item.icon}
                {item.text}
              </Button>
            ))}
            <Button
              id="products-button"
              onMouseEnter={handleProductsMouseEnter}
              sx={{ 
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: darkMode 
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(64, 224, 208, 0.1)'
                }
              }}
            >
              <ShoppingCartIcon sx={{ fontSize: '16px', mr: 0.5 }} />
              Products
            </Button>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box ref={searchRef}>
              <IconButton
                size="small"
                onClick={handleSearchClick}
                sx={{ 
                  color: theme.palette.text.primary,
                  mr: 1,
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: darkMode 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(64, 224, 208, 0.1)'
                  }
                }}
              >
                <SearchIcon sx={{ fontSize: '18px' }} />
              </IconButton>
            </Box>

            <IconButton
              size="small"
              onClick={toggleDarkMode}
              sx={{ 
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.text.primary}`,
                borderRadius: '6px',
                padding: '3px',
                '&:hover': {
                  backgroundColor: darkMode 
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(64, 224, 208, 0.1)'
                }
              }}
            >
              {darkMode ? 
                <DarkModeIcon sx={{ fontSize: '16px' }} /> : 
                <LightModeIcon sx={{ fontSize: '16px' }} />
              }
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      {/* Search Popper */}
      <Popper
        open={isSearchOpen}
        anchorEl={searchRef.current}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={handleSearchClose}>
          <Paper
            sx={{
              p: 2,
              width: 300,
              maxHeight: 400,
              overflow: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                autoFocus
                placeholder="Konularda ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
            </Box>

            {isSearching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : searchResults.length > 0 ? (
              <List>
                {searchResults.map((result) => (
                  <ListItem
                    key={result.id}
                    button
                    onClick={() => handleResultClick(result)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: 'rgba(64, 224, 208, 0.1)'
                      }
                    }}
                  >
                    <ListItemText
                      primary={result.title}
                      secondary={result.description}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.8rem',
                        noWrap: true
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : searchQuery.length >= 2 ? (
              <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                Sonuç bulunamadı
              </Box>
            ) : null}
          </Paper>
        </ClickAwayListener>
      </Popper>

      {/* Products Menu */}
      <Popper
        open={Boolean(productsAnchorEl)}
        anchorEl={productsAnchorEl}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
      >
        <Box
          onMouseEnter={() => setProductsAnchorEl(document.getElementById('products-button'))}
          onMouseLeave={() => {
            setTimeout(() => {
              setProductsAnchorEl(null);
            }, 100);
          }}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: -10,
              left: 0,
              right: 0,
              height: 10
            }
          }}
        >
          <Paper
            sx={{
              mt: 1,
              width: 600,
              maxWidth: '90vw',
              maxHeight: 'calc(100vh - 100px)',
              overflow: 'auto',
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 600,
                color: theme.palette.text.primary,
                borderBottom: `2px solid ${theme.palette.divider}`,
                pb: 1,
                mb: 1,
                fontSize: '1rem'
              }}>
                Featured Products
              </Typography>
              <Grid container spacing={1}>
                {products.map((product) => (
                  <Grid item xs={3} key={product.id}>
                    <Box
                      onClick={() => handleProductClick(product)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 0.75,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(64, 224, 208, 0.1)',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Avatar
                        src={product.image}
                        alt={product.name}
                        variant="rounded"
                        sx={{
                          width: 45,
                          height: 45,
                          mb: 0.75,
                          backgroundColor: 'rgba(64, 224, 208, 0.1)',
                          border: '2px solid #40E0D0'
                        }}
                      />
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          color: theme.palette.text.primary,
                          mb: 0.5,
                          lineHeight: 1.2,
                          height: '2.4em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#40E0D0',
                          fontWeight: 600
                        }}
                      >
                        {product.price}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Popper>
    </AppBar>
  );
};

export default Navbar; 