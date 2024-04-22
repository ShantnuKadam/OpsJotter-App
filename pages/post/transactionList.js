import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export default function TransactionsList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactionCreate');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched transactions:', data); // Debug log
        setTransactions(data.transactions);
      } else {
        console.error('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <List>
      {transactions.map((transaction) => {
        console.log('Rendering transaction:', transaction); // Debug log
        return (
          <ListItem key={transaction._id}>
            <ListItemText
              primary={`Job Number: ${transaction.jobnumber}`}
              secondary={`User ID: ${transaction.userID} - Billable: ${transaction.billable}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
