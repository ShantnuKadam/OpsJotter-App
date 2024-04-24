import React from 'react';
import { Avatar, Card, CardContent, Typography, Grid, Paper, List, ListItem, ListItemText, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// You would replace this data with your actual dynamic data
const chartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Users',
      data: [12, 19, 3, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const DashboardPage = () => {
  const paperBgColor = '#cce6ff';
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        {/* Users */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Users
              </Typography>
              <AvatarGroup />
            </CardContent>
          </Card>
        </Grid>

        {/* Transactions */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ padding: 2, bgcolor: paperBgColor }}>
            <Typography variant="h6" gutterBottom>
              Transactions
            </Typography>
            <Typography variant="body1">
              Number of users: 28
            </Typography>
            <Typography variant="body1">
              Number of transactions: 189
            </Typography>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={2} sx={{ padding: 2, bgcolor: paperBgColor }}>
            <Typography variant="h6" gutterBottom>
              Recent Notification
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Alfredo Torres paid XXX amount" secondary="1 minute ago" />
              </ListItem>
              {/* Add more list items here */}
            </List>
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ padding: 2, bgcolor: paperBgColor }}>
            <Typography variant="h6" gutterBottom>
              Statistics
            </Typography>
            <Bar data={chartData} options={options} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Helper component to render the Avatar group
const AvatarGroup = () => {
  // Add actual user data here
  const users = [
    { name: 'Alfredo', imageUrl: '/alfredo.jpg' },
    { name: 'Claudia', imageUrl: '/claudia.jpg' },
    // ... more users
  ];

  return (
    <Grid container spacing={2}>
      {users.map((user, index) => (
        <Grid item key={index}>
          <Avatar alt={user.name} src={user.imageUrl} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardPage;
