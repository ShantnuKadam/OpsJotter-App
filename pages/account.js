// pages/signup.tsx

import { useState } from 'react';
import { Button, TextField, Container, Typography, Alert } from '@mui/material';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            setSuccess('User registered successfully!');
            setError('');
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        } else {
            setError(data.error || 'Failed to register');
        }
    };

    

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Sign Up</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Re-enter Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    sx={{ mt: 2 }}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Signup;
