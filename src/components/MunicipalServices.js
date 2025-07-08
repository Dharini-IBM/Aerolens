import React, { useState } from 'react';
import { Typography, Box, Button, Card, CardContent, Stack, Snackbar, Alert, Chip, Avatar, Divider, CircularProgress, Paper, Grid } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BarChart } from '@mui/x-charts/BarChart';

const randomViolations = [
  {
    plate: 'KA01AB1234',
    zone: 'Zone A',
    amount: 500,
    reason: 'Illegal Parking',
    imageUrl: '/assets/car1.jpg',
    aiSeverity: 'High',
    location: '12.9716, 77.5946',
  },
  {
    plate: 'DL03XY9876',
    zone: 'Zone B',
    amount: 1000,
    reason: 'No Parking Zone',
    imageUrl: '/assets/car2.jpg',
    aiSeverity: 'Moderate',
    location: '12.2958, 76.6394',
  },
  {
    plate: 'MH12CD4321',
    zone: 'Zone C',
    amount: 750,
    reason: 'Blocking Fire Exit',
    imageUrl: '/assets/car3.jpg',
    aiSeverity: 'High',
    location: '13.0827, 80.2707',
  },
  {
    plate: 'TN09EF5678',
    zone: 'Zone D',
    amount: 600,
    reason: 'Double Parking',
    imageUrl: '/assets/car4.jpg',
    aiSeverity: 'Low',
    location: '12.9141, 74.8560',
  },
  {
    plate: 'AP16GH8765',
    zone: 'Zone E',
    amount: 850,
    reason: 'Obstructing Traffic',
    imageUrl: '/assets/car5.jpg',
    aiSeverity: 'Moderate',
    location: '17.3850, 78.4867',
  },
];

const officerByZone = {
  'Zone A': 'Officer R. Kumar',
  'Zone B': 'Officer S. Mehta',
  'Zone C': 'Officer P. Singh',
  'Zone D': 'Officer L. Rao',
  'Zone E': 'Officer V. Patel',
};

function SmallMap({ location }) {
  if (!location) return null;
  const [lat, lng] = location.split(',').map(Number);
  if (isNaN(lat) || isNaN(lng)) return null;
  return (
    <Box sx={{ height: 120, width: '100%', my: 1, borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
      <MapContainer center={[lat, lng]} zoom={16} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false} dragging={false} doubleClickZoom={false} zoomControl={false} attributionControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} />
      </MapContainer>
    </Box>
  );
}

// Mock challan data for the current month (days 1- today)
const today = new Date().getDate();
const challanStats = Array.from({ length: today }, (_, i) => ({
  day: i + 1,
  count: Math.floor(Math.random() * 6) + 2 // 2-7 challans per day
}));

// Calculate summary stats
const totalThisMonth = challanStats.reduce((sum, d) => sum + d.count, 0);
const challansToday = challanStats[today - 1]?.count || 0;
const challansThisWeek = challanStats.slice(-7).reduce((sum, d) => sum + d.count, 0);

const MunicipalServices = () => {
  const [violations, setViolations] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [challan, setChallan] = useState(null);
  const [sent, setSent] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const handleScanWithDrone = () => {
    setScanning(true);
    setTimeout(() => {
      // Randomly select 2 or 3 unique violations
      const shuffled = randomViolations.sort(() => 0.5 - Math.random());
      const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
      setViolations(shuffled.slice(0, count));
      setScanning(false);
      setChallan(null);
      setSent(false);
    }, 2000); // Simulate drone scan delay
  };

  const handleGenerateChallan = (violation) => {
    setChallan({
      ...violation,
      challanId: 'CHLN' + Math.floor(Math.random() * 1000000),
      status: 'Pending',
      officer: officerByZone[violation.zone] || 'Officer (Auto-Assigned)',
      date: new Date().toLocaleString(),
    });
    setSent(false);
  };

  const handleSendToRevenue = () => {
    setChallan((prev) => ({ ...prev, status: 'Sent to Revenue' }));
    setSent(true);
    setSnackbar(true);
  };

  return (
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2">This Month’s Digital Enforcement</Typography>
            <Typography variant="h5" color="primary">{totalThisMonth}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2">This Week’s Enforcement Pulse</Typography>
            <Typography variant="h5" color="warning.main">{challansThisWeek}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2">Live: Today's Digital Challans</Typography>
            <Typography variant="h5" color="success.main">{challansToday}</Typography>
          </Paper>
        </Grid>
      </Grid>

      
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>Digital Challans Generated This Month</Typography>
        <BarChart
          xAxis={[{ scaleType: 'band', data: challanStats.map(d => d.day) }]}
          series={[{ data: challanStats.map(d => d.count), label: 'Challans' }]}
          height={200}
          margin={{ left: 40, right: 10, top: 10, bottom: 30 }}
        />
      </Box>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<FlightTakeoffIcon />}
          onClick={handleScanWithDrone}
          disabled={scanning}
        >
          {scanning ? 'Scanning Area with Drone...' : 'Scan Area with Drone'}
        </Button>
        {scanning && <CircularProgress size={32} sx={{ alignSelf: 'center' }} />}
        {violations.length > 0 && !challan && !scanning && (
          <Stack spacing={2}>
            {violations.map((violation, idx) => (
              <Card key={idx} variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={violation.imageUrl} alt="Evidence" variant="rounded" sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>AI Detected Violation</Typography>
                      <Chip label={`AI Severity: ${violation.aiSeverity}`} color={violation.aiSeverity === 'High' ? 'error' : 'warning'} />
                    </Box>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography><b>Vehicle:</b> {violation.plate}</Typography>
                  <Typography><b>Zone:</b> {violation.zone}</Typography>
                  <Typography><b>Location:</b> {violation.location}</Typography>
                  <SmallMap location={violation.location} />
                  <Typography><b>Reason:</b> {violation.reason}</Typography>
                  <Typography><b>Amount:</b> ₹{violation.amount}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleGenerateChallan(violation)}
                  >
                    Generate Digital Challan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
        {challan && (
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={challan.imageUrl} alt="Evidence" variant="rounded" sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>Challan ID: {challan.challanId}</Typography>
                  <Chip label={`AI Severity: ${challan.aiSeverity}`} color={challan.aiSeverity === 'High' ? 'error' : 'warning'} />
                </Box>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Typography><b>Vehicle:</b> {challan.plate}</Typography>
              <Typography><b>Zone:</b> {challan.zone}</Typography>
              <Typography><b>Location:</b> {challan.location}</Typography>
              <SmallMap location={challan.location} />
              <Typography><b>Reason:</b> {challan.reason}</Typography>
              <Typography><b>Amount:</b> ₹{challan.amount}</Typography>
              <Typography><b>Date:</b> {challan.date}</Typography>
              <Typography><b>Status:</b> <Chip label={challan.status} color={challan.status === 'Sent to Revenue' ? 'success' : 'info'} /></Typography>
              <Typography><b>Assigned Officer:</b> {challan.officer}</Typography>
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" spacing={2} alignItems="center">
                <QrCode2Icon color="action" />
                <Typography variant="body2">Scan to Pay Instantly</Typography>
                {/* In a real app, generate a QR code for payment here */}
              </Stack>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={handleSendToRevenue}
                disabled={sent}
              >
                {sent ? 'Sent to Revenue System' : 'Send to Revenue System'}
              </Button>
            </CardContent>
          </Card>
        )}
      </Stack>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
        <Alert onClose={() => setSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Challan sent to revenue system!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MunicipalServices;