import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Typography
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const pages = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Pothole Detection', path: '/potholes' },
  { label: 'Parking Violations', path: '/violations' },
  { label: 'Traffic Optimization', path: '/traffic' },
  { label: 'Municipal Services', path: '/maintenance' }
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const currentPage = pages.findIndex(p => location.pathname.startsWith(p.path));
    if (currentPage !== -1) {
      setTabIndex(currentPage);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    navigate(pages[newValue].path);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, mb: 1 }}>
            AI Drone Dashboard
          </Typography>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
          >
            {pages.map((page, index) => (
              <Tab key={index} label={page.label} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Box p={3}>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
