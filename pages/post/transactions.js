import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/router'; // Assuming you're using react-router

export default function NewClient() {
  const [transaction, setTransaction] = useState({
    jobnumber: '',
    userID: '',
    billable: '',
    serviceproviderid: '',
    referncenumber: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [error, setError] = useState('');
  const router = useRouter(); // For navigating to another page


  useEffect(() => {
    const uniqueJobNumber = `JOB-${Date.now()}`; // Example format: "JOB-1618329822739"
    setTransaction(prev => ({ ...prev, jobnumber: uniqueJobNumber }));
  }, []);


  const handleCancel = () => {
    // Reset the transaction state to initial values
    setTransaction({
      userID: '',
      billable: '',
      serviceproviderid: '',
      referncenumber: '',
    });
    // Optionally, navigate to a different page or refresh the current page
    router.push('/post/Dashboard'); // Replace '/' with the path you want to navigate to
  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/transactionCreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Transaction created:', data);
      setSnackbarMessage('Transaction created successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTransaction({ jobnumber: '', userID: '', billable: '', serviceproviderid: '', referncenumber: '' }); // Reset form
      // router.push('/post/clientList');
    } else {
      console.error('Failed to create Transaction');
      setSnackbarMessage('Error creating Transaction. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', height: '100vh', marginTop: '100px', padding: '20px' }}>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <TextField id="jobnumber" label="Auto System Job number" name="jobnumber" required autoFocus sx={{ width: '50ch' }} value={transaction.jobnumber} onChange={handleChange} InputProps={{
              readOnly: true, // Make the field read-only since it's auto-generated
            }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField id="userID" label="Auto user ID + Time & Date" name="userID" sx={{ width: '50ch' }} value={transaction.userID} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField id="billable" label="Expense or billable activity" name="billable" sx={{ width: '50ch' }} value={transaction.billable} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField id="serviceproviderid" label="Service Provider ID" name="serviceproviderid" sx={{ width: '50ch' }} value={transaction.serviceproviderid} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <TextField id="referncenumber" label="Service Provider Refernce Number" name="referncenumber" sx={{ width: '50ch' }} value={transaction.referncenumber} onChange={handleChange} />
        </div>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, mr: 2 }}>
          Save Client
        </Button>
        <Button type="button" variant="outlined" sx={{ mt: 3, mb: 2, mr: 2 }} onClick={handleCancel}>
        Cancel
      </Button>
      </form>
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
}
