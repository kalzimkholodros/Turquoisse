import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SubSubject from './components/SubSubject';
import About from './pages/About';
import Blog from './pages/Blog';
import HomePage from './pages/HomePage';
import Courses from './pages/Courses';
import ProductDetail from './pages/ProductDetail';
import Pricing from './pages/Pricing';

function App() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#2f3542' : '#fff',
        paper: darkMode ? '#2f3542' : '#fff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#40E0D0',
      }
    },
  });

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CssBaseline />
          <Box sx={{ position: 'fixed', width: '100%', top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Navbar 
              toggleSidebar={toggleSidebar}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </Box>
          <Box sx={{ display: 'flex', flex: 1, mt: '40px' }}>
            <Sidebar
              open={open}
              onClose={toggleSidebar}
              darkMode={darkMode}
            />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${200}px)` },
                ml: { sm: `${200}px` }
              }}
            >
              <Routes>
                <Route path="/subject/:subjectId" element={<SubSubject />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
