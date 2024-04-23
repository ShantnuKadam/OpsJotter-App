import React, { useState } from 'react';
import Image from 'next/image';
import { StyledListItem,  drawerWidth } from '../../styles/homeStyle';
import DashboardPage from './Dashboard';
import ProjectPage from './clientList';
import TransactionsList from './transactionList';
import logoImage from './image/OpsJotter2.png';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItemIcon, ListItemText, IconButton, Container, Grid, TextField, Menu, MenuItem } from '@mui/material';
import {
  Menu as MenuIcon, Dashboard as DashboardIcon,
  Settings as SettingsIcon, 
  LocalMall as LocalMallIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, DesignServices as DesignServicesIcon, Upload as UploadIcon, Assessment as AssessmentIcon, AccountCircle as AccountCircleIcon,

} from '@mui/icons-material';


const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState('Dashboard');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (view) => {
    setActiveView(view);
  };



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Image src={logoImage} alt="Company Logo" style={{ width: '80%', maxWidth: '450px', height: 'auto' }} />
      </Toolbar>

      <List>
        <StyledListItem
          button
          selected={activeView === 'Dashboard'}
          onClick={() => handleListItemClick('Dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon color={activeView === 'Dashboard' ? 'primary' : 'action'} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </StyledListItem>
        {/* More items ... */}
        <StyledListItem
          button
          selected={activeView === 'Client Overview'}
          onClick={() => handleListItemClick('Client Overview')}
        >
          <ListItemIcon>
            <GroupsIcon color={activeView === 'Client Overview' ? 'primary' : 'action'} />
          </ListItemIcon>
          <ListItemText primary="Client Overview" />
        </StyledListItem>
        <StyledListItem
          button
          selected={activeView === 'Services Overview'}
          onClick={() => handleListItemClick('Services Overview')}
        >
          <ListItemIcon>
            <LocalMallIcon color={activeView === 'Services Overview' ? 'primary' : 'action'} />
          </ListItemIcon>
          <ListItemText primary="Services Overview" />
        </StyledListItem>
        <StyledListItem
          button
          selected={activeView === 'Reports'}
          onClick={() => handleListItemClick('Reports')}
        >
          <ListItemIcon>
            <AssessmentIcon color={activeView === 'Reports' ? 'primary' : 'action'} />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </StyledListItem>
        <StyledListItem
          button
          selected={activeView === 'Transactions'}
          onClick={() => handleListItemClick('Transactions')}
        >
          <ListItemIcon>
            <DesignServicesIcon color={activeView === 'Transactions' ? 'primary' : 'action'} />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </StyledListItem>
        <StyledListItem
          button
          selected={activeView === 'User Management'}
          onClick={() => handleListItemClick('User Management')}
        >
          <ListItemIcon>
            <ManageAccountsIcon color={activeView === 'User Management' ? 'primary' : 'action'} />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </StyledListItem>
        <StyledListItem
          button
          selected={activeView === 'Settings'}
          onClick={() => handleListItemClick('Settings')}
        >
          <ListItemIcon>
            <SettingsIcon color={activeView === 'Settings' ? 'primary' : 'action'} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledListItem>
      </List>
    </div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Client Overview':
        return <ProjectPage view="New Project" />;
        case 'Transactions':
          return <TransactionsList/>;

      // Additional cases for other views ...
      // default:
      //   return <Typography>Select a view from the left menu.</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#b3e6ff',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* Search Bar */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search here"
            sx={{ mr: 2, bgcolor: 'background.paper', borderRadius: 1 }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" noWrap component="div" onClick={handleMenuOpen}>
            <AccountCircleIcon />
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleListItemClick('Profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleListItemClick('Logout')}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to better match your needs */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* This will render the active view */}
            {renderActiveView()}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
