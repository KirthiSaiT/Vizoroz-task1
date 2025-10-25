import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  styled,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Fastfood as FoodIcon,
  TrendingUp as ReportIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

// Styled components for better appearance
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: '#2E7D32',
    color: 'white',
    width: 260,
    border: 'none',
  },
}));

const NavItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: '0 50px 50px 0',
  margin: '5px 10px',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
  color: active ? '#fff' : 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Menu Items', icon: <FoodIcon />, path: '/menu' },
    { text: 'Reports', icon: <ReportIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  return (
    <StyledDrawer variant="permanent">
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            mx: 'auto', 
            mb: 2, 
            bgcolor: 'white',
            color: '#2E7D32'
          }}
        >
          <FoodIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
          Food Inventory
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Management System
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />

      <List>
        {navItems.map((item) => (
          <NavItem
            button
            key={item.text}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ 
                fontWeight: location.pathname === item.path ? 600 : 400,
                fontSize: '1.1rem'
              }} 
            />
          </NavItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', mb: 2 }}>
        <NavItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout" 
            primaryTypographyProps={{ 
              fontWeight: 400,
              fontSize: '1.1rem'
            }} 
          />
        </NavItem>
      </Box>
    </StyledDrawer>
  );
};

export default Navigation;