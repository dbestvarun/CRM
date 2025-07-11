import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Box, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Stack, Grid } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Card, CardMedia } from '@mui/material';
import { Product, initialProducts } from './components/productsData';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductsGrid from './components/ProductsGrid';
import CompaniesGrid from './components/CompaniesGrid';
import TasksBoard from './components/TasksBoard';
import Dashboard from './components/Dashboard';
import AccountPage from './components/AccountPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111',
      paper: '#181818',
    },
    primary: {
      main: '#fff',
      contrastText: '#111',
    },
    secondary: {
      main: '#bdbdbd',
    },
    text: {
      primary: '#fff',
      secondary: '#bdbdbd',
    },
    divider: '#333',
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial',
    fontWeightBold: 700,
    fontWeightRegular: 400,
    h6: {
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#111',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#181818',
        },
      },
    },
  },
});

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Companies', path: '/companies' },
  { label: 'Products', path: '/products' },
  { label: 'Tasks', path: '/tasks' },
  { label: 'Account', path: '/account' },
];

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  description: '',
  type: '',
  price: 0,
  imageUrl: '',
  weight: '',
  protein: '',
  fat: '',
  fiber: '',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="transparent" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, letterSpacing: 2 }}>
              Nutricana CRM
            </Typography>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                sx={{ mx: 1 }}
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<CompaniesGrid />} />
            <Route path="/products" element={<ProductsGrid />} />
            <Route path="/tasks" element={<TasksBoard />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
