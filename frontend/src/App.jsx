import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from './features/itemsSlice'
import ItemList from './components/ItemList'
import ItemForm from './components/ItemForm'
import { Container, Typography, Box, Paper } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#e57373',
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
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            CRUD Application
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Add New Item
            </Typography>
            <ItemForm />
          </Paper>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">Error: {error}</Typography>}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Items List
            </Typography>
            <ItemList />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App