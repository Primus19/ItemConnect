
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Avatar, Button, TextField, Grid, Paper, Snackbar, Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const ProfilePage = () => {
  const { currentUser, fetchUserProfile } = useAuth();
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        bio: currentUser.bio || ''
      });
      setPreview(currentUser.avatar?.startsWith('/uploads') ? `http://localhost:5000${currentUser.avatar}` : currentUser.avatar);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    await api.post('/auth/upload-avatar', formData);
    fetchUserProfile();
    setSuccess(true);
  };

  const handleSave = async () => {
    await api.put('/auth/profile', form);
    fetchUserProfile();
    setSuccess(true);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>My Profile</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={preview} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item>
            <Button variant="outlined" component="label">
              Change Avatar
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <Button onClick={handleUpload} sx={{ ml: 2 }} variant="contained">Upload</Button>
          </Grid>
        </Grid>

        <TextField fullWidth margin="normal" label="First Name" name="firstName" value={form.firstName} onChange={handleInputChange} />
        <TextField fullWidth margin="normal" label="Last Name" name="lastName" value={form.lastName} onChange={handleInputChange} />
        <TextField fullWidth margin="normal" label="Bio" name="bio" multiline rows={3} value={form.bio} onChange={handleInputChange} />

        <Button onClick={handleSave} fullWidth variant="contained" sx={{ mt: 2 }}>Save Profile</Button>
      </Paper>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Profile updated!</Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
