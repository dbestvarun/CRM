import React from 'react';
import { Card, Typography, Box, Stack, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { initialCompanies } from './companiesData';
import { initialProducts } from './productsData';
import { initialTasks } from './tasksData';

const summary = [
  {
    label: 'Companies',
    value: initialCompanies.length,
    icon: <BusinessIcon fontSize="large" sx={{ color: '#fff' }} />, 
  },
  {
    label: 'Products',
    value: initialProducts.length,
    icon: <InventoryIcon fontSize="large" sx={{ color: '#fff' }} />, 
  },
  {
    label: 'Tasks',
    value: initialTasks.length,
    icon: <AssignmentIcon fontSize="large" sx={{ color: '#fff' }} />, 
  },
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} mb={4}>
        {summary.map((item) => (
          <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
            <Card sx={{ background: '#181818', color: '#fff', borderRadius: 3, p: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 2px 8px #0002' }}>
              {item.icon}
              <Stack>
                <Typography variant="h5" fontWeight={700}>{item.value}</Typography>
                <Typography variant="subtitle2" color="#bbb">{item.label}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ background: '#222', borderRadius: 3, p: 4, minHeight: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
        [Charts coming soon]
      </Box>
    </Box>
  );
};

export default Dashboard; 