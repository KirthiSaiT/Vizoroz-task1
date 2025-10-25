import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import InventoryManager from './components/InventoryManager';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green for food theme
    },
    secondary: {
      main: '#FF9800', // Orange for accent
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#2E7D32',
    },
    h2: {
      fontWeight: 600,
      color: '#333',
    },
    h3: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h4: {
      fontWeight: 600,
      color: '#333',
    },
    h5: {
      fontWeight: 600,
      color: '#444',
    },
    h6: {
      fontWeight: 600,
    },
  },
  spacing: 8, // Base spacing unit
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: '#2E7D32', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Food Inventory Manager
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <InventoryManager />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;