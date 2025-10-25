import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/itemsSlice';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Alert,
  styled
} from '@mui/material';
import {
  Fastfood,
  Inventory,
  AddShoppingCart,
  Restaurant,
  TrendingUp,
  AttachMoney,
  Refresh
} from '@mui/icons-material';

// Styled components for better appearance
const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
  },
}));

const StatAvatar = styled(Avatar)(({ theme, bgcolor }) => ({
  width: 56,
  height: 56,
  margin: '0 auto 16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);
  const totalItems = items.length;
  const totalValue = items.reduce((sum, item) => sum + (item.price || 0), 0);

  // Convert USD to INR (approximate conversion)
  const convertToINR = (usd) => {
    const exchangeRate = 83; // Approximate USD to INR exchange rate
    return (usd * exchangeRate).toFixed(2);
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          Error loading data: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Dashboard Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#2E7D32' }}>
          Food Inventory Dashboard
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Efficiently manage your food inventory and track item values
        </Typography>
      </Box>

      {/* Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<Refresh />}
          onClick={handleRefresh}
          sx={{ borderRadius: 8, px: 3, py: 1.5, boxShadow: 3 }}
        >
          Refresh Data
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <StatAvatar sx={{ bgcolor: 'primary.main' }}>
                <Inventory sx={{ fontSize: 32 }} />
              </StatAvatar>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Items
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {totalItems}
              </Typography>
            </CardContent>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <StatAvatar sx={{ bgcolor: 'secondary.main' }}>
                <AttachMoney sx={{ fontSize: 32 }} />
              </StatAvatar>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Value (INR)
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                ₹{convertToINR(totalValue)}
              </Typography>
            </CardContent>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <StatAvatar sx={{ bgcolor: 'info.main' }}>
                <Restaurant sx={{ fontSize: 32 }} />
              </StatAvatar>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Avg. Price (INR)
              </Typography>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {totalItems > 0 ? `₹${convertToINR(totalValue / totalItems)}` : '₹0.00'}
              </Typography>
            </CardContent>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <StatAvatar sx={{ bgcolor: 'success.main' }}>
                <TrendingUp sx={{ fontSize: 32 }} />
              </StatAvatar>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Status
              </Typography>
              <Chip 
                label="Operational" 
                color="success" 
                size="medium" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.2rem', 
                  height: 36,
                  borderRadius: 8,
                }} 
              />
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Inventory Summary */}
      <DashboardCard sx={{ mb: 4 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Inventory />
            </Avatar>
          }
          title={
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Inventory Overview
            </Typography>
          }
          subheader="Summary of all food items in your inventory"
        />
        <CardContent>
          {items.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Avatar sx={{ width: 72, height: 72, mx: 'auto', mb: 3, bgcolor: 'primary.main' }}>
                <Fastfood sx={{ fontSize: 36 }} />
              </Avatar>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                No inventory items found
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                Add items to your inventory to get started
              </Typography>
            </Box>
          ) : (
            <Box>
              <Grid container spacing={3}>
                {items.slice(0, 6).map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                              {item.name}
                            </Typography>
                            <Chip 
                              label={`ID: ${item.id}`} 
                              size="small" 
                              color="primary" 
                              variant="outlined" 
                            />
                          </Box>
                          <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <Fastfood />
                          </Avatar>
                        </Box>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2, minHeight: 60 }}>
                          {item.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" color="textSecondary">
                            Price:
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                            ₹{convertToINR(item.price)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {items.length > 6 && (
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    Showing 6 of {items.length} items. View all items in the inventory management section.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </DashboardCard>
    </Box>
  );
};

export default Dashboard;