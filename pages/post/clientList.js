import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NewClient from './newClient';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';

export default function ClientsList() {
  const [clients, setclients] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('/api/createClient');
      if (response.ok) {
        const data = await response.json();
        setclients(data.clients);
      } else {
        console.error('Failed to fetch clients');
      }
    };

    fetchClients();
  }, []);

  const handleNewPage = () => {
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <NewClient />;
  }

  const handleRowClick = (clientId) => {
    // Navigate to the client detail page with the client ID
    router.push(`/post/client/${clientId}`);
  };


  return (
    <Box sx={{ width: '100%', margin: 'auto', paddingTop: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button
          variant="contained"
          backgroundColor='blue'
          color="primary"
          onClick={handleNewPage}
        >
          New Client
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '& th': { backgroundColor: 'blue', color: 'white' } }}>
              <TableCell>firstName</TableCell>
              <TableCell>lastName</TableCell>
              <TableCell>suffix</TableCell>
              <TableCell>customerDisplayName</TableCell>
              <TableCell>companyName</TableCell>
              <TableCell>email</TableCell>
              <TableCell>phone</TableCell>
              <TableCell>fax</TableCell>
              <TableCell>abnNumber</TableCell>
              <TableCell>postCode</TableCell>
              {/* Add more headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
                onClick={() => handleRowClick(client._id)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{client.firstName}</TableCell>
                <TableCell>{client.lastName}</TableCell>
                <TableCell>{client.suffix}</TableCell>
                <TableCell>{client.customerDisplayName}</TableCell>
                <TableCell>{client.companyName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.fax}</TableCell>
                <TableCell>{client.abnNumber}</TableCell>
                <TableCell>{client.postCode}</TableCell>
                {/* <TableCell>{client.suffix}</TableCell>
                <TableCell>{client.suffix}</TableCell>
                <TableCell>{client.suffix}</TableCell>
                <TableCell>{client.suffix}</TableCell> */}
                {/* Add more cells if needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
