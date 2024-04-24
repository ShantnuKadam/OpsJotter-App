import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Paper, Typography, CircularProgress, Alert, Snackbar, InputAdornment, IconButton, Button, TextField } from '@mui/material';

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Try to create the user in the MongoDB database
        try {
            const response = await fetch('/api/userCreate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) throw new Error('Failed to create account');

            const data = await response.json();
            console.log('Client created:', data);

            // Store the name in localStorage
            localStorage.setItem('userName', name);



            // If user creation is successful, send an email notification
            const emailResponse = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            if (!emailResponse.ok) throw new Error('Email notification failed');

            setSnackbarMessage('Account created and email sent successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage(error.message);
            setSnackbarSeverity('error');
        } finally {
            setIsLoading(false);
            setSnackbarOpen(true);
            // Reset form fields after the operation
            setName('');
            setEmail('');
            setPassword('');
            router.push('/post/home');
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={10} style={{ padding: 100, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 20 }}>
                    Create Account
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={handleNameChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" type="submit" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert variant="filled" severity={snackbarSeverity} onClose={handleSnackbarClose}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CreateAccount;
