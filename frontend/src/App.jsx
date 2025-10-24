import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from './features/itemsSlice'
import ItemList from './components/ItemList'
import ItemForm from './components/ItemForm'
import { Container, Typography, Box, Paper, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#e57373',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
      color: '#333',
    },
    h5: {
      fontWeight: 500,
      color: '#444',
    },
  },
})

function App() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.items)

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Bon Appetit Cafe - Menu Manager
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Manage your cafe menu items efficiently
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Add Item Section */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Add New Menu Item
              </Typography>
              <ItemForm />
            </Paper>
          </Box>
          
          {/* Items List Section */}
          <Box sx={{ flex: 2 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Menu Items
                </Typography>
                {loading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">Error: {error}</Typography>}
              </Box>
              <ItemList />
            </Paper>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App