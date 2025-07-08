import React, { useEffect, useState } from 'react';
import axios from '../api/mockApi';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

const PotholeDetection = () => {
  const [potholes, setPotholes] = useState([]);

  useEffect(() => {
    axios.get("/api/potholes").then(res => setPotholes(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h6">Detected Potholes</Typography>
      {potholes.length === 0 ? <CircularProgress /> : potholes.map((p, i) => (
        <Card key={i} sx={{ my: 2 }}>
          <CardContent>
            <Typography><b>Severity:</b> {p.severity}</Typography>
            <Typography><b>Coordinates:</b> {p.lat}, {p.lng}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PotholeDetection;