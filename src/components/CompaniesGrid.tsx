import React from 'react';
import { Company, initialCompanies } from './companiesData';
import { Card, CardMedia, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Stack } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const emptyCompany: Omit<Company, 'id'> = {
  name: '',
  description: '',
  industry: '',
  location: '',
  logoUrl: '',
  revenue: '',
  purchases: [],
};

const CompaniesGrid: React.FC = () => {
  const [companies, setCompanies] = React.useState<Company[]>(initialCompanies);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editId, setEditId] = React.useState<number | null>(null);
  const [form, setForm] = React.useState<Omit<Company, 'id'>>(emptyCompany);
  const [purchaseForm, setPurchaseForm] = React.useState<{ productName: string; monthlyQuantity: number }>({ productName: '', monthlyQuantity: 0 });
  const [editingPurchaseIdx, setEditingPurchaseIdx] = React.useState<number | null>(null);

  const handleOpenAdd = () => {
    setEditId(null);
    setForm(emptyCompany);
    setDialogOpen(true);
  };

  const handleOpenEdit = (company: Company) => {
    setEditId(company.id);
    setForm({ ...company });
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setForm(emptyCompany);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (form.name.trim() === '') return;
    if (editId === null) {
      // Add
      const newCompany: Company = {
        ...form,
        id: companies.length ? Math.max(...companies.map(c => c.id)) + 1 : 1,
      };
      setCompanies([newCompany, ...companies]);
    } else {
      // Edit
      setCompanies(companies.map(c => c.id === editId ? { ...form, id: editId } : c));
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  // Add or update a purchase in the form
  const handleAddOrUpdatePurchase = () => {
    if (!purchaseForm.productName || purchaseForm.monthlyQuantity <= 0) return;
    let newPurchases = [...form.purchases];
    if (editingPurchaseIdx !== null) {
      newPurchases[editingPurchaseIdx] = { ...purchaseForm };
    } else {
      newPurchases.push({ ...purchaseForm });
    }
    setForm({ ...form, purchases: newPurchases });
    setPurchaseForm({ productName: '', monthlyQuantity: 0 });
    setEditingPurchaseIdx(null);
  };

  // Edit a purchase in the form
  const handleEditPurchase = (idx: number) => {
    setPurchaseForm({ ...form.purchases[idx] });
    setEditingPurchaseIdx(idx);
  };

  // Remove a purchase from the form
  const handleRemovePurchase = (idx: number) => {
    const newPurchases = form.purchases.filter((_, i) => i !== idx);
    setForm({ ...form, purchases: newPurchases });
    setPurchaseForm({ productName: '', monthlyQuantity: 0 });
    setEditingPurchaseIdx(null);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Companies
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{ borderRadius: 2, fontWeight: 700, background: '#fff', color: '#111', boxShadow: 'none', ':hover': { background: '#eee' } }}
        >
          Add Company
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
        {companies.map((company) => (
          <Card key={company.id} sx={{ background: '#181818', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.10)', p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <CardMedia
                component="img"
                image={company.logoUrl}
                alt={company.name}
                sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2, border: '1px solid #333', background: '#222' }}
              />
            </Box>
            <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', mb: 1, textAlign: 'center', letterSpacing: 1 }}>
              {company.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center', minHeight: 40 }}>
              {company.description.length > 50 ? company.description.slice(0, 50) + '...' : company.description}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
              <Typography variant="caption" color="text.secondary">Industry: <b>{company.industry}</b></Typography>
              <Typography variant="caption" color="text.secondary">Revenue: <b>{company.revenue}</b></Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
              {company.location}
            </Typography>
            {company.purchases.length > 0 && (
              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 0.5, textAlign: 'center' }}>
                  Purchases (monthly):
                </Typography>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', textAlign: 'center' }}>
                  {company.purchases.map((purchase, idx) => (
                    <li key={idx} style={{ marginBottom: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {purchase.productName}: <b>{purchase.monthlyQuantity}kg/month</b>
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
            <Stack direction="row" spacing={1} justifyContent="center" mt="auto">
              <IconButton aria-label="edit" size="small" onClick={() => handleOpenEdit(company)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete" size="small" onClick={() => handleDelete(company.id)} sx={{ color: '#fff', border: '1px solid #333', borderRadius: 2 }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Box>
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, letterSpacing: 1, background: '#111', color: '#fff' }}>
          {editId === null ? 'Add Company' : 'Edit Company'}
        </DialogTitle>
        <DialogContent sx={{ background: '#181818' }}>
          <Stack spacing={2} mt={1}>
            <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required autoFocus InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline minRows={2} InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Industry" name="industry" value={form.industry} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Location" name="location" value={form.location} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Revenue" name="revenue" value={form.revenue} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            <TextField label="Logo URL" name="logoUrl" value={form.logoUrl} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
            {/* Purchases section */}
            <Box sx={{ background: '#222', borderRadius: 2, p: 2, mt: 2 }}>
              <Typography variant="subtitle2" color="#fff" sx={{ mb: 1 }}>Purchases (monthly):</Typography>
              <Stack direction="row" spacing={2} mb={1}>
                <TextField label="Product Name" name="productName" value={purchaseForm.productName} onChange={e => setPurchaseForm({ ...purchaseForm, productName: e.target.value })} size="small" InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ flex: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
                <TextField label="Quantity (kg/month)" name="monthlyQuantity" value={purchaseForm.monthlyQuantity} onChange={e => setPurchaseForm({ ...purchaseForm, monthlyQuantity: Number(e.target.value) })} type="number" size="small" InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ flex: 1, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
                <Button onClick={handleAddOrUpdatePurchase} variant="contained" sx={{ background: '#fff', color: '#111', fontWeight: 700, minWidth: 90 }}>
                  {editingPurchaseIdx !== null ? 'Update' : 'Add'}
                </Button>
              </Stack>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {form.purchases.map((purchase, idx) => (
                  <li key={idx} style={{ marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      {purchase.productName}: <b>{purchase.monthlyQuantity}kg/month</b>
                    </Typography>
                    <span>
                      <IconButton size="small" onClick={() => handleEditPurchase(idx)} sx={{ color: '#fff', ml: 1 }}><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => handleRemovePurchase(idx)} sx={{ color: '#fff', ml: 1 }}><DeleteIcon fontSize="small" /></IconButton>
                    </span>
                  </li>
                ))}
              </ul>
            </Box>
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

export default CompaniesGrid; 