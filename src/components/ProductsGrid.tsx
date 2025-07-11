import React from 'react';
import { Product, initialProducts } from './productsData';
import { Card, CardMedia, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

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

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editId, setEditId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<Omit<Product, 'id'>>(emptyProduct);

  const handleOpenAdd = () => {
    setEditId(null);
    setForm(emptyProduct);
    setDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditId(product.id);
    setForm({ ...product });
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setForm(emptyProduct);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (form.name.trim() === '') return;
    if (editId === null) {
      // Add
      const newProduct: Product = {
        ...form,
        id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
        price: Number(form.price),
      };
      setProducts([newProduct, ...products]);
    } else {
      // Edit
      setProducts(products.map(p => p.id === editId ? { ...form, id: editId, price: Number(form.price) } : p));
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Cattle Feed Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ borderRadius: 2, fontWeight: 700, background: '#fff', color: '#111', boxShadow: 'none', ':hover': { background: '#eee' } }}
        >
          Add Product
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 3,
          width: '100%',
        }}
      >
        {products.map((product) => (
          <Card key={product.id} sx={{ background: '#181818', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
                sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2, border: '1px solid #333', background: '#222' }}
              />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', mb: 1, textAlign: 'center', letterSpacing: 1 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center', minHeight: 48 }}>
              {product.description.length > 60 ? product.description.slice(0, 60) + '...' : product.description}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
              <Typography variant="caption" color="text.secondary">Protein: <b>{product.protein}</b></Typography>
              <Typography variant="caption" color="text.secondary">Fat: <b>{product.fat}</b></Typography>
              <Typography variant="caption" color="text.secondary">Fiber: <b>{product.fiber}</b></Typography>
            </Stack>
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#fff', textAlign: 'center', mb: 2 }}>
              ₹{product.price}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" mt="auto">
              <IconButton aria-label="edit" size="small" onClick={() => handleOpenEdit(product)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={() => handleDelete(product.id)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, letterSpacing: 1, background: '#111', color: '#fff' }}>
          {editId === null ? 'Add Product' : 'Edit Product'}
        </DialogTitle>
        <DialogContent sx={{ background: '#181818' }}>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required autoFocus InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Type" name="type" value={form.type} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Weight" name="weight" value={form.weight} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Protein" name="protein" value={form.protein} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Fat" name="fat" value={form.fat} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Fiber" name="fiber" value={form.fiber} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Price (₹)" name="price" value={form.price} onChange={handleChange} type="number" fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline minRows={2} InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ background: '#181818' }}>
          <Button onClick={handleClose} sx={{ color: '#fff' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ background: '#fff', color: '#111', fontWeight: 700, ':hover': { background: '#eee' } }}>
            {editId === null ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsGrid; 