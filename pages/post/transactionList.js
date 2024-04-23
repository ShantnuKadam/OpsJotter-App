import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NewTransaction from './transactions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';

export default function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();  // Hook for routing
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactionCreate');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions);
      } else {
        console.error('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  const handleNewPage = () => {
    setShowDashboard(true); 
  };

  if (showDashboard) {
    return <NewTransaction />; 
  }

  return (
    <Box sx={{ width: '100%', margin: 'auto', paddingTop: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button
          variant="contained"
          backgroundColor= 'blue'
          color="primary"
          onClick={handleNewPage}
        >
          Open New Page
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '& th': { backgroundColor: 'blue', color: 'white' } }}>
              <TableCell>Auto System Job number</TableCell>
              <TableCell>ID + Time & Date</TableCell>
              <TableCell>Expense or billable activity</TableCell>
              <TableCell>Service Provider ID</TableCell>
              <TableCell>Service Provider Reference Number</TableCell>
              {/* Add more headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >
                  {transaction.jobnumber}
                </TableCell>
                <TableCell>{transaction.userID}</TableCell>
                <TableCell>{transaction.billable.toString()}</TableCell>
                <TableCell>{transaction.serviceproviderid}</TableCell>
                <TableCell>{transaction.referncenumber}</TableCell>
                {/* Add more cells if needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
