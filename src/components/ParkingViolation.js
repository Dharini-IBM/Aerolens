// src/components/ParkingViolation/ParkingViolationDashboard.jsx

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Paper,
  Box
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const violationTypes = [
  { value: "illegal", label: "Illegal Parking" },
  { value: "driveway", label: "Obstructing Driveway" },
  { value: "handicap", label: "In Handicap Zone" }
];

const ParkingViolation = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ plate: "", location: "", type: "illegal", lat: "", lng: "" });
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setViolations([
        { plate: "MH12AB1234", type: "illegal", location: "Zone A", timestamp: "2025-07-07", lat: 18.5204, lng: 73.8567 },
        { plate: "DL8CAF4321", type: "driveway", location: "Zone B", timestamp: "2025-07-07", lat: 28.6139, lng: 77.2090 },
        { plate: "KA03MN4567", type: "illegal", location: "Zone C", timestamp: "2025-07-08", lat: 12.9716, lng: 77.5946 },
        { plate: "MH12XY9999", type: "handicap", location: "Zone A", timestamp: "2025-07-08", lat: 19.0760, lng: 72.8777 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getCount = (type) => violations.filter((v) => v.type === type).length;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...violations, { ...form, timestamp: new Date().toISOString().split('T')[0], lat: parseFloat(form.lat), lng: parseFloat(form.lng) }];
    setViolations(updated);
    setSnack(true);
    setForm({ plate: "", location: "", type: "illegal", lat: "", lng: "" });
  };

  const chartData = violationTypes.map(v => ({
    name: v.label,
    count: getCount(v.value)
  }));

  const trendData = violations.reduce((acc, curr) => {
    const found = acc.find(a => a.date === curr.timestamp);
    if (found) found.count += 1;
    else acc.push({ date: curr.timestamp, count: 1 });
    return acc;
  }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

  const headers = [
    { label: "License Plate", key: "plate" },
    { label: "Violation Type", key: "type" },
    { label: "Location", key: "location" },
    { label: "Timestamp", key: "timestamp" },
    { label: "Latitude", key: "lat" },
    { label: "Longitude", key: "lng" }
  ];

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Parking Violation Dashboard</Typography>

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#ffebee', height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Total Violations</Typography>
              <Typography variant="h3">{violations.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd', height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Illegal Parking</Typography>
              <Typography variant="h3">{getCount("illegal")}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#f3e5f5', height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Driveway Obstruction</Typography>
              <Typography variant="h3">{getCount("driveway")}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: '#e8f5e9', height: '100%' }}>
            <CardContent>
              <Typography variant="h6">In Handicap Zone</Typography>
              <Typography variant="h3">{getCount("handicap")}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Violation Types Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1976d2" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <Box mt={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Violations Trend Over Time</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#f44336" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <Box mt={5}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Violation Map</Typography>
          <MapContainer center={[20.5937, 78.9629]} zoom={4} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {violations.map((v, i) => (
              <Marker key={i} position={[v.lat, v.lng]}>
                <Popup>
                  <strong>{v.plate}</strong><br />
                  {v.type}<br />
                  {v.location}<br />
                  {v.timestamp}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Paper>
      </Box>

      <Box mt={5}>
        <Typography variant="h5">Report New Violation</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="License Plate" name="plate" value={form.plate} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth label="Location" name="location" value={form.location} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField fullWidth label="Latitude" name="lat" value={form.lat} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField fullWidth label="Longitude" name="lng" value={form.lng} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField select fullWidth label="Violation Type" name="type" value={form.type} onChange={handleChange}>
                {violationTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" color="primary">Submit Violation</Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)} message="Violation reported" />
    </Box>
  );
};

export default ParkingViolation;