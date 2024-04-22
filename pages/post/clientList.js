import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ProjectPage from './newClient';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

export default function Home() {
  const [rows, setRows] = useState([
    { id: 1, name: 'John Parker', location: 'Sydney', status: 'Active' },
    { id: 2, name: 'Alicia', location: 'Qatar', status: 'Inactive' },
    { id: 3, name: 'Sonal', location: 'India', status: 'Retired' },
  ]);

  const [showDashboard, setShowDashboard] = useState(false);

  const [newRow, setNewRow] = useState({
    name: '',
    location: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = rows.length + 1;
    setRows(prevRows => [...prevRows, { id: newId, ...newRow }]);
    setNewRow({ name: '', location: '', status: '' });
  };

  const handleNewClientClick = () => {
    setShowDashboard(true); 
  };

  if (showDashboard) {
    return <ProjectPage />; 
  }

  return (
    <>
       <Box sx={{ marginBottom: 2 }}>
       <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ margin: 1 }}
          onClick={() => handleNewClientClick('New client')}
        >
          New Client
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact details</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id.toString().padStart(2, '0')}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Button variant="contained">View</Button>
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
