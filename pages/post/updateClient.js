import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';

export default function UpdateClient(clientId) {
    const [client, setClient] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        suffix: '',
        customerDisplayName: '',
        companyName: '',
        email: '',
        phone: '',
        fax: '',
        abnNumber: '',
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: '',
        postCode: '',
        country: '',
    });
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const router = useRouter();
    const { id } = router.query;  // Assuming 'id' is the query param
    console.log (id);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`/api/updateClient?id=${id}`)
                .then(res => res.json())
                .then(data => {
                    setClient(data.client);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch client', error);
                    setSnackbarOpen(true);
                    setSnackbarMessage('Failed to fetch client details');
                    setSnackbarSeverity('error');
                    setLoading(false);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        fetch(`/api/updateClient?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client),
        })
            .then(res => res.json())
            .then(data => {
                setSnackbarOpen(true);
                setSnackbarMessage('Client updated successfully!');
                setSnackbarSeverity('success');
                setLoading(false);
                router.push('/post/clientList');  // Navigate to the list of clients
            })
            .catch(error => {
                console.error('Failed to update client', error);
                setSnackbarOpen(true);
                setSnackbarMessage('Failed to update client');
                setSnackbarSeverity('error');
                setLoading(false);
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                {loading ? 'Loading...' : 'Edit Client'}
            </Typography>
            <TextField
                label="First Name"
                name="firstName"
                value={client.firstName}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <TextField
                margin="normal"
                fullWidth
                label="Middle Name"
                name="middleName"
                value={client.middleName}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Last Name"
                name="lastName"
                value={client.lastName}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Suffix"
                name="suffix"
                value={client.suffix}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Customer Display Name"
                name="customerDisplayName"
                value={client.customerDisplayName}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Company Name"
                name="companyName"
                value={client.companyName}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={client.email}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Phone"
                name="phone"
                value={client.phone}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="FAX"
                name="fax"
                value={client.fax}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="ABN Number"
                name="abnNumber"
                value={client.abnNumber}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Street Address 1"
                name="streetAddress1"
                value={client.streetAddress1}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Street Address 2"
                name="streetAddress2"
                value={client.streetAddress2}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="City"
                name="city"
                value={client.city}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="State"
                name="state"
                value={client.state}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Post Code"
                name="postCode"
                value={client.postCode}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                fullWidth
                label="Country"
                name="country"
                value={client.country}
                onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                Save Changes
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert variant="filled" onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
