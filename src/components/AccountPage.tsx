import React from 'react';
import { Card, Avatar, Typography, Box, Stack, TextField, Button, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const initialProfile = {
  name: 'Varun Parashar',
  email: 'varun.parashar@nutricana.com',
  company: 'Nutricana Livestock Pvt. Ltd.',
  password: '',
};

const AccountPage: React.FC = () => {
  const [profile, setProfile] = React.useState(initialProfile);
  const [form, setForm] = React.useState(initialProfile);
  const [editing, setEditing] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
  };

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Account
      </Typography>
      <Card sx={{ background: '#181818', color: '#fff', borderRadius: 3, p: 4, mb: 4, display: 'flex', alignItems: 'center', gap: 3, boxShadow: '0 2px 8px #0002' }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: '#222', border: '2px solid #fff' }}>
          <AccountCircleIcon sx={{ fontSize: 64 }} />
        </Avatar>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={700}>{profile.name}</Typography>
          <Typography variant="body1" color="#bbb">{profile.email}</Typography>
          <Typography variant="body2" color="#bbb">{profile.company}</Typography>
        </Stack>
        <Box flex={1} />
        <Button variant="contained" sx={{ background: '#fff', color: '#111', fontWeight: 700, borderRadius: 2, boxShadow: 'none', ':hover': { background: '#eee' } }} onClick={handleEdit} disabled={editing}>
          Edit Profile
        </Button>
      </Card>
      <Card sx={{ background: '#181818', color: '#fff', borderRadius: 3, p: 4, boxShadow: '0 2px 8px #0002', maxWidth: 480, mx: 'auto' }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {editing ? 'Edit Profile' : 'Profile Details'}
        </Typography>
        <Divider sx={{ mb: 3, borderColor: '#333' }} />
        <Stack spacing={3}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth disabled={!editing} InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth disabled={!editing} InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
          <TextField label="Company" name="company" value={form.company} onChange={handleChange} fullWidth disabled={!editing} InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
          <TextField label="Password" name="password" value={form.password} onChange={handleChange} fullWidth disabled={!editing} type="password" InputLabelProps={{ style: { color: '#fff' } }} inputProps={{ style: { color: '#fff' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' }, '&:hover fieldset': { borderColor: '#fff' } } }} />
        </Stack>
        {editing && (
          <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
            <Button onClick={handleCancel} sx={{ color: '#fff' }}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" sx={{ background: '#fff', color: '#111', fontWeight: 700, ':hover': { background: '#eee' } }}>
              Save
            </Button>
          </Stack>
        )}
      </Card>
    </Box>
  );
};

export default AccountPage; 