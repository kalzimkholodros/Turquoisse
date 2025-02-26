import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Drawer,
  Stack,
  useTheme,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const MenuItem = ({ item, darkMode, theme }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubItemClick = (subItem) => {
    // URL'de kullanılabilir hale getirmek için başlığı slug formatına çeviriyoruz
    const slug = subItem.title
      .toLowerCase()
      .replace(/\s+/g, '') // boşlukları kaldır
      .replace(/\.+/g, '') // noktaları kaldır
      .replace(/[^a-z0-9-]/g, ''); // alfanumerik olmayan karakterleri kaldır
    
    console.log("Tıklanan alt konu:", subItem);
    console.log("Oluşturulan slug:", slug);
    
    navigate(`/subject/${slug}`, { 
      state: { 
        title: subItem.title,
        description: subItem.description,
        parentTitle: item.title
      } 
    });
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          minHeight: '32px',
          py: 0.5,
          px: 1.5,
          color: darkMode ? theme.palette.text.primary : 'white',
          '&:hover': {
            backgroundColor: darkMode 
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.1)'
          }
        }}
      >
        <ListItemText 
          primary={item.title} 
          sx={{ 
            '& .MuiTypography-root': {
              fontSize: '0.8rem',
              fontWeight: 600,
            }
          }}
        />
        {item.subItems && item.subItems.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      
      {item.subItems && item.subItems.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map((subItem, index) => (
              <ListItemButton
                key={index}
                onClick={() => handleSubItemClick(subItem)}
                sx={{
                  minHeight: '28px',
                  py: 0.25,
                  pl: 4,
                  color: darkMode ? theme.palette.text.primary : 'white',
                  '&:hover': {
                    backgroundColor: darkMode 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <ListItemText 
                  primary={subItem.title} 
                  secondary={subItem.description}
                  sx={{ 
                    '& .MuiTypography-root': {
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    },
                    '& .MuiTypography-secondary': {
                      fontSize: '0.7rem',
                      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = ({ open, onClose, darkMode }) => {
  const theme = useTheme();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const drawerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
          throw new Error('Menü öğeleri yüklenemedi');
        }
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleMouseDown = (e) => {
    const paperElement = drawerRef.current?.querySelector('.MuiDrawer-paper');
    if (!paperElement) return;

    setIsDragging(true);
    setStartY(e.pageY - paperElement.offsetTop);
    setScrollTop(paperElement.scrollTop);
    setDragStartTime(Date.now());
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const paperElement = drawerRef.current?.querySelector('.MuiDrawer-paper');
    if (!paperElement) return;

    const y = e.pageY - paperElement.offsetTop;
    const walk = (y - startY) * 1.5;
    paperElement.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = (e) => {
    // Eğer sürükleme süresi 150ms'den azsa ve fare hareket etmediyse, 
    // bunu tıklama olarak kabul et ve sürüklemeyi iptal et
    if (Date.now() - dragStartTime < 150) {
      const paperElement = drawerRef.current?.querySelector('.MuiDrawer-paper');
      if (paperElement) {
        const movement = Math.abs(e.pageY - (startY + paperElement.offsetTop));
        if (movement < 5) {
          // Tıklama olayının normal şekilde devam etmesine izin ver
          setIsDragging(false);
          return;
        }
      }
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const drawerStyles = {
    '& .MuiDrawer-paper': {
      width: 200,
      marginTop: '40px',
      marginLeft: '20px',
      height: 'calc(100% - 40px)',
      backgroundColor: darkMode ? theme.palette.background.paper : '#40E0D0',
      color: darkMode ? theme.palette.text.primary : 'white',
      borderRight: 'none',
      borderRadius: '8px 8px 0 0',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      overflowY: 'auto',
      cursor: isDragging ? 'grabbing' : 'grab',
      userSelect: 'none',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)',
        borderRadius: '4px',
        '&:hover': {
          background: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.4)',
        },
      },
    },
  };

  if (loading) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        variant="persistent"
        ref={drawerRef}
        sx={{
          ...drawerStyles,
          '& .MuiDrawer-paper': {
            ...drawerStyles['& .MuiDrawer-paper'],
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }}
      >
        <CircularProgress sx={{ color: darkMode ? 'white' : 'white' }} />
      </Drawer>
    );
  }

  if (error) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        variant="persistent"
        ref={drawerRef}
        sx={drawerStyles}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <ListItemText primary={error} />
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="persistent"
      ref={drawerRef}
      sx={drawerStyles}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <List component="nav" sx={{ p: 1 }}>
        {menuItems.map((item, index) => (
          <MenuItem 
            key={index} 
            item={item} 
            darkMode={darkMode} 
            theme={theme}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 