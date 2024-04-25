import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

export default function NewTransaction({ transactionId }) {
  const [transaction, setTransaction] = useState({
    jobnumber: '',
    userID: '',
    billable: '',
    serviceproviderid: '',
    referncenumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const router = useRouter();

  // Fetch transaction details
  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/transactionCreate?id=${transactionId}`);
        const data = await response.json();
        if (response.ok) {
          setTransaction(data.transaction);
        } else {
          throw new Error(data.error || 'Failed to fetch transaction');
        }
      } catch (error) {
        setSnackbarMessage(error.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/transactionCreate?id=${transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      if (response.ok) {
        setSnackbarMessage('Transaction updated successfully!');
        setSnackbarSeverity('success');
      } else {
        throw new Error(data.error || 'Error updating transaction');
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/transactions'); // or wherever you want to redirect
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h6" gutterBottom>{loading ? 'Loading...' : 'Edit Transaction'}</Typography>
      {loading ? (
        <p>Loading transaction data...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Form fields like the following */}
          <TextField label="Auto System Job number" name="jobnumber" value={transaction.jobnumber} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Auto user ID + Time & Date" name="userID" value={transaction.userID} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Expense or billable activity" name="billable" value={transaction.billable} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Service Provider ID" name="serviceproviderid" value={transaction.serviceproviderid} onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Service Provider Refernce Number" name="referncenumber" value={transaction.referncenumber} onChange={handleChange} fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary">Save Changes</Button>
          <Button onClick={handleCancel} variant="outlined" color="secondary">Cancel</Button>
        </form>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert variant="filled" onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
