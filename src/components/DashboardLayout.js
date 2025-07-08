import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SavingsIcon from '@mui/icons-material/Savings';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const pages = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Pothole Detection', path: '/potholes' },
  { label: 'Parking Violations', path: '/violations' },
  { label: 'Traffic Optimization', path: '/traffic' },
  { label: 'Municipal Services', path: '/maintenance' }
];


const stats = [
  {
    title: "Active Drones",
    value: 24,
    trend: "+12%",
    subtext: "from last week",
    icon: <PrecisionManufacturingIcon />,
    iconColor: "#2196f3"
  },
  {
    title: "Potholes Detected",
    value: 1223,
    trend: "+8%",
    subtext: "from yesterday",
    icon: <TrendingUpIcon />,
    iconColor: "#ff9800"
  },
  {
    title: "Repairs Completed",
    value: 875,
    trend: "+15%",
    subtext: "from last month",
    icon: <CheckCircleIcon />,
    iconColor: "#4caf50"
  },
  {
    title: "Cost Savings",
    value: "74%",
    trend: "vs traditional methods",
    icon: <SavingsIcon />,
    iconColor: "#ffeb3b"
  }
];

const detectionAccuracy = [
  { label: 'YOLOv8 (Visible Light)', value: 78 },
  { label: 'YOLOv8 (Infrared)', value: 95 },
  { label: 'YOLOv7', value: 67 }
];

const LiveMap = () => {
  const points = [
    { x: 1, y: 1, color: 'red' },
    { x: 2, y: 3, color: 'orange' },
    { x: 3, y: 2, color: 'blue' },
    { x: 1, y: 3, color: 'green' },
    { x: 2, y: 2, color: 'blue' },
    { x: 3, y: 1, color: 'orange' },
    { x: 2, y: 1, color: 'red' },
    { x: 3, y: 3, color: 'green' }
  ];

  return (
    <Box mt={5}>
      <Typography variant="h6" gutterBottom>
        Live Road Conditions Map
      </Typography>
      <Box
        sx={{
          bgcolor: "#e3f2fd",
          height: 300,
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          border: "2px solid #ccc"
        }}
      >
        {[1, 2].map(i => (
          <Box key={`h-${i}`} sx={{ position: "absolute", top: `${(i * 100) / 3}%`, width: "100%", height: "2px", bgcolor: "black" }} />
        ))}
        {[1, 2].map(i => (
          <Box key={`v-${i}`} sx={{ position: "absolute", left: `${(i * 100) / 3}%`, height: "100%", width: "2px", bgcolor: "black" }} />
        ))}
        {points.map((p, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: `${(p.y * 100) / 3 - 4}%`,
              left: `${(p.x * 100) / 3 - 4}%`,
              width: 12,
              height: 12,
              bgcolor: p.color,
              borderRadius: "50%"
            }}
          />
        ))}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: 1,
            px: 2,
            py: 1,
            fontSize: 12
          }}
        >
          <Box display="flex" alignItems="center" gap={1}><Box sx={{ width: 10, height: 10, bgcolor: 'red', borderRadius: '50%' }} /> Critical</Box>
          <Box display="flex" alignItems="center" gap={1}><Box sx={{ width: 10, height: 10, bgcolor: 'orange', borderRadius: '50%' }} /> Moderate</Box>
          <Box display="flex" alignItems="center" gap={1}><Box sx={{ width: 10, height: 10, bgcolor: 'green', borderRadius: '50%' }} /> Minor</Box>
          <Box display="flex" alignItems="center" gap={1}><Box sx={{ width: 10, height: 10, bgcolor: 'blue', borderRadius: '50%' }} /> Active Drone</Box>
        </Box>
      </Box>
    </Box>
  );
};

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
const [liveStats, setLiveStats] = useState(stats);

  useEffect(() => {
  const interval = setInterval(() => {
    setLiveStats(prev =>
      prev.map(stat => {
        if (typeof stat.value === 'number') {
          const change = Math.floor(Math.random() * 10 - 5); // -5 to +4
          return {
            ...stat,
            value: Math.max(0, stat.value + change),
            trend: `${change >= 0 ? '+' : ''}${change}%`
          };
        }
        return stat; // skip strings like '74%'
      })
    );
  }, 5000); // every 5s

  return () => clearInterval(interval);
}, []);

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
    <Box   >
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
  
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
      {/* Show dashboard content only on the Dashboard tab */}
      {tabIndex === 0 && (
        <Box p={3}  sx={{ marginTop:'-60px'}}>
          <Box
  sx={{
    width: '100%',
    background: 'linear-gradient(90deg, #2196f3, #1e88e5)',
    color: 'white',
    textAlign: 'center',
    py: 6,
    px: 2,
    mt: 2,
    mb:3,
    ml:-2,
    borderRadius: 2
  }}
>
  <Typography variant="h4" fontWeight="bold" gutterBottom>
    Real-Time Operations Dashboard
  </Typography>
  <Typography variant="subtitle1" gutterBottom>
    Monitor autonomous drone operations and AI-powered pothole detection
  </Typography>

  <Grid
    container
    spacing={3}
    justifyContent="center"
    sx={{ mt: 3 }}
  >
    <Grid item xs={12} sm={6} md={4} lg={2.5}>
      <Box 
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          py: 2,
          pr: 4,
          pl:4,
          
        }}
      >
        <Typography variant="h5" fontWeight="bold">89</Typography>
        <Typography variant="body2">Potholes Detected Yesterday</Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={2.5}>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          py: 2,
          pr: 4,
          pl: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold">48</Typography>
        <Typography variant="body2">Total Drones</Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6} md={4} lg={2.5}>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          py: 2,
          pr: 4,
          pl:4,
        }}
      >
        <Typography variant="h5" fontWeight="bold">91%</Typography>
        <Typography variant="body2">Repair Efficiency</Typography>
      </Box>
    </Grid>
  </Grid>
</Box>


          <Grid container spacing={3} mt={1}>
            {liveStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={6} sx={{ borderRadius: 3 ,width:'22vw' ,height:'17vh'}}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle2" color="textSecondary">{stat.title}</Typography>
                      <Avatar sx={{ bgcolor: stat.iconColor, width: 32, height: 32 }}>
                        {stat.icon}
                      </Avatar>
                    </Box>
                    <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="caption" color="success.main">
                      ↑ {stat.trend}
                    </Typography>
                    <Typography variant="caption" display="block" color="textSecondary">
                      {stat.subtext}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <LiveMap />

          <Grid container spacing={3} mt={4}>
            <Grid item xs={12} md={6} lg={6}>
              <Card elevation={3} sx={{ borderRadius: 3,width:'47vw' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Recent Detections
                  </Typography>
                  <Typography color="text.secondary" align="center" py={5}>
                    No recent detections available
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Card elevation={3} sx={{ borderRadius: 3,width:'47vw' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Detection Accuracy
                  </Typography>
                  {detectionAccuracy.map((item, i) => (
                    <Box key={i} mb={2}>
                      <Typography fontSize={14}>{item.label}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.value}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#ffc1073b",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#2196f3"
                          }
                        }}
                      />
                      <Typography fontSize={12} textAlign="right">{item.value}%</Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: "#e8f5e9",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Typography fontWeight="bold" color="green">System Performance</Typography>
                    <Chip label="Optimal" color="success" />
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    Current system achieving 95.12% accuracy with infrared cameras and optimized CNN models.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default DashboardLayout;
