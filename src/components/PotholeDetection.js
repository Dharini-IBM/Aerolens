import React, { useEffect, useState } from 'react';
import axios from '../api/mockApi';
import {
  Card, CardContent, CardHeader, CardMedia, Typography, Box, Grid, Chip, Button, CircularProgress, Stack, Alert, Tooltip
} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import MapIcon from '@mui/icons-material/Map';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DroneIcon from '@mui/icons-material/Flight';
import PotholeLiveChart from './PotholeLiveChart';

const SEVERITY_COLORS = {
  High: 'error',
  Medium: 'warning',
  Low: 'success',
};
const SEVERITY_ICONS = {
  High: <WarningAmberIcon color="error" sx={{ mr: 0.5 }} fontSize="small" />,
  Medium: <ReportProblemIcon color="warning" sx={{ mr: 0.5 }} fontSize="small" />,
  Low: <CheckCircleIcon color="success" sx={{ mr: 0.5 }} fontSize="small" />,
};

function formatTimestamp(ts) {
  const date = new Date(ts);
  return `Detected on: ${date.toLocaleString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })}`;
}

const PotholeDetection = () => {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios.get('/api/potholes')
      .then(res => setPotholes(res.data))
      .catch(() => {
        setError(true);
        setPotholes([]); // empty fallback
      })
      .finally(() => setLoading(false));
  }, []);

  const total = potholes.length;
  const severityCounts = { High: 0, Medium: 0, Low: 0 };
  potholes.forEach(p => {
    const key = p.severity === 'Moderate' ? 'Medium' : p.severity;
    severityCounts[key] = (severityCounts[key] || 0) + 1;
  });

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 1, md: 3 } }}>
      <Chip label="Live Drone Feed Enabled" color="success" sx={{ mb: 4 }} />
      {/* Coverage and Drones Chips */}
      <Typography variant="h4" gutterBottom>Real-time Pothole Intelligence Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        This dashboard provides a live view of pothole incidents with severity ratings, coordinates,
        and map links for immediate municipal action.
      </Typography>

      <Stack direction="row" spacing={3} mt={1} mb={3}>
        <Chip label="Coverage: 14.2 km² scanned today" color="info" icon={<MapIcon />} />
        <Chip label="Active Drones: 5" color="primary" icon={<DroneIcon />} />
      </Stack>
      {/* Summary */}
      <Box mb={4}>
        <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="center">
              <Card sx={{ p: 2, bgcolor: 'grey.50', textAlign: 'center', borderRadius: 3, boxShadow: 3, mb: 2, minWidth: 500, maxWidth: 700, height: 340, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Total Potholes</Typography>
                <Typography variant="h2" color="primary.main" fontWeight={800} sx={{ fontSize: 80 }}>{total}</Typography>
              </Card>
              {Array.isArray(potholes) && potholes.length > 0 && (
                <PotholeLiveChart potholes={potholes} />
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <Chip icon={SEVERITY_ICONS.High} label={`High: ${severityCounts.High}`} color="error" sx={{ fontWeight: 600, fontSize: 16, px: 2, py: 1, borderRadius: 2 }} />
              <Chip icon={SEVERITY_ICONS.Medium} label={`Medium: ${severityCounts.Medium}`} color="warning" sx={{ fontWeight: 600, fontSize: 16, px: 2, py: 1, borderRadius: 2 }} />
              <Chip icon={SEVERITY_ICONS.Low} label={`Low: ${severityCounts.Low}`} color="success" sx={{ fontWeight: 600, fontSize: 16, px: 2, py: 1, borderRadius: 2 }} />
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress size={48} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ textAlign: 'center', mx: 'auto', maxWidth: 400 }}>
          Failed to load pothole data.
        </Alert>
      ) : potholes.length === 0 ? (
        <Alert severity="info" sx={{ textAlign: 'center', mx: 'auto', maxWidth: 400 }}>
          No potholes detected. Roads are clear!
        </Alert>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {potholes.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card
                sx={{
                  width: 300,
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: 6,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-6px) scale(1.02)', boxShadow: 12 },
                  alignItems: 'center',
                  p: 0,
                }}
              >
                <CardHeader
                  avatar={
                    <Tooltip title={`${p.severity} severity`}>
                      <Chip
                        label={p.severity}
                        color={SEVERITY_COLORS[p.severity] || 'default'}
                        icon={SEVERITY_ICONS[p.severity]}
                        sx={{ fontSize: 13, height: 28 }}
                      />
                    </Tooltip>
                  }
                  title={<Box display="flex" alignItems="center" gap={1} sx={{ fontSize: 14 }}><RoomIcon fontSize="small" /> {p.lat}, {p.lng}</Box>}
                  subheader={<span style={{ fontSize: 13 }}>{formatTimestamp(p.timestamp)}</span>}
                  sx={{ p: 1, width: '100%' }}
                />
                <CardMedia
                  component="img"
                  height="180"
                  image={p.imageUrl}
                  alt={`Pothole severity ${p.severity}`}
                  sx={{ objectFit: 'cover', borderRadius: 2, mx: 2, my: 1, minHeight: 120, background: '#f5f5f5' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x220/cccccc/222?text=Image+Unavailable'; }}
                />
                <CardContent sx={{ width: '100%', p: 1, pb: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    href={`https://maps.google.com/?q=${p.lat},${p.lng}`}
                    target="_blank"
                    startIcon={<MapIcon />}
                    sx={{ minHeight: 28, fontSize: 13, py: 0, px: 0.5 }}
                  >
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PotholeDetection;
