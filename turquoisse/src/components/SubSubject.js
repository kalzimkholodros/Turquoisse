import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const SubSubject = () => {
  const { subjectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const contentRef = useRef(null);
  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');

  // Scroll to hash on initial load
  useEffect(() => {
    if (location.hash && !loading) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveHeading(id);
        }, 100);
      }
    }
  }, [location.hash, loading]);

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        console.log("Fetching data for subjectId:", subjectId);
        
        const response = await fetch('http://localhost:5000/api/menu');
        console.log("API Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const menuData = await response.json();
        console.log("Received menu data:", menuData);
        
        let foundSubject = null;
        menuData.forEach(menu => {
          const subject = menu.subItems.find(item => item.slug === subjectId);
          if (subject) {
            foundSubject = {
              title: subject.title,
              parentTitle: menu.title,
              content: subject.content
            };
          }
        });

        if (!foundSubject) {
          throw new Error('Subject not found');
        }

        setSubjectData(foundSubject);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (subjectId) {
      fetchSubjectData();
    }
  }, [subjectId]);

  useEffect(() => {
    if (contentRef.current) {
      const headingElements = contentRef.current.querySelectorAll('h2');
      const headingData = Array.from(headingElements).map(heading => ({
        id: heading.textContent.toLowerCase().replace(/\s+/g, '-'),
        text: heading.textContent,
        element: heading
      }));
      
      headingElements.forEach((heading, index) => {
        heading.id = headingData[index].id;
      });
      
      setHeadings(headingData);
    }
  }, [subjectData]);

  // Scroll tracking with Intersection Observer
  useEffect(() => {
    if (!contentRef.current || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Görünür başlıkları bul ve en üstte olanı seç
        const visibleEntries = entries.filter(entry => {
          const rect = entry.target.getBoundingClientRect();
          // Başlık viewport'un üst kısmına yakın ve görünür olmalı
          return rect.top <= 150 && rect.bottom >= 150 && entry.intersectionRatio > 0;
        });

        if (visibleEntries.length > 0) {
          // En üstteki başlığı bul
          const topEntry = visibleEntries.reduce((prev, current) => {
            return (prev.target.getBoundingClientRect().top > current.target.getBoundingClientRect().top) 
              ? current 
              : prev;
          });
          
          setActiveHeading(topEntry.target.id);
          console.log('Active heading:', topEntry.target.id, 'Position:', topEntry.target.getBoundingClientRect().top);
        }
      },
      {
        root: null,
        rootMargin: '-150px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
      }
    );

    // Tüm başlıkları gözlemle
    headings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToSection = (headingId) => {
    const element = document.getElementById(headingId);
    if (element) {
      const offset = 150;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      
      setActiveHeading(headingId);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {error}
          <br />
          <small>SubjectId: {subjectId}</small>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, pl: '100px', pb: '500px', position: 'relative' }}>
      {/* Navigation Box */}
      <Paper
        elevation={2}
        sx={{
          position: 'fixed',
          right: '50px',
          top: '100px',
          width: '280px',
          backgroundColor: theme.palette.background.paper,
          borderRadius: '8px',
          zIndex: 1000,
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto'
        }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <MenuBookIcon sx={{ color: '#40E0D0' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            İçindekiler
          </Typography>
        </Box>
        <List sx={{ p: 1 }}>
          {headings.map((heading) => (
            <ListItem
              key={heading.id}
              onClick={() => scrollToSection(heading.id)}
              sx={{
                borderRadius: '6px',
                cursor: 'pointer',
                mb: 0.5,
                backgroundColor: activeHeading === heading.id ? '#40E0D0' : 'transparent',
                '&:hover': {
                  backgroundColor: activeHeading === heading.id ? '#40E0D0' : 'rgba(64, 224, 208, 0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {activeHeading === heading.id ? (
                  <BookmarkIcon sx={{ 
                    color: activeHeading === heading.id ? '#fff' : '#40E0D0',
                    fontSize: '1.2rem'
                  }} />
                ) : (
                  <ArrowRightIcon sx={{ 
                    color: theme.palette.text.primary,
                    fontSize: '1.2rem'
                  }} />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={heading.text}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9rem',
                    fontWeight: activeHeading === heading.id ? 600 : 400,
                    color: activeHeading === heading.id ? '#fff' : theme.palette.text.primary,
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          width: '50%',
          backgroundColor: 'transparent'
        }}
      >
        <Typography variant="h4" gutterBottom>
          {location.state?.title || subjectData?.title}
        </Typography>
        
        <Box 
          ref={contentRef}
          sx={{ 
            mt: 4,
            '& h2': {
              fontSize: '1.5rem',
              fontWeight: 600,
              color: theme.palette.primary.main,
              marginTop: '2rem',
              marginBottom: '1rem',
              scrollMarginTop: '50px',
              position: 'relative'
            },
            '& p': {
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '1rem'
            }
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: subjectData?.content || 'İçerik yüklenemedi.' }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default SubSubject; 