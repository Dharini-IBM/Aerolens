import React from 'react';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button component={Link} to="/dashboard"><ListItemText primary="Dashboard" /></ListItem>
        <ListItem button component={Link} to="/potholes"><ListItemText primary="Pothole Detection" /></ListItem>
        <ListItem button component={Link} to="/violations"><ListItemText primary="Parking Violations" /></ListItem>
        <ListItem button component={Link} to="/traffic"><ListItemText primary="Traffic Optimization" /></ListItem>
        <ListItem button component={Link} to="/maintenance"><ListItemText primary="Municipal Services" /></ListItem>
      </List>
    </Drawer>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"><Toolbar>AI Drone Dashboard</Toolbar></AppBar>
      <Box p={2}>{children}</Box>
    </Box>
  </Box>
);

export default DashboardLayout;