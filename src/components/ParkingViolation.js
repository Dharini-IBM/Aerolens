import React, { useEffect, useState } from 'react';
import axios from '../api/mockApi';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';

const ParkingViolation = () => {
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    axios.get("/api/violations").then(res => setViolations(res.data));
  }, []);

  return (
    <Box>
      <Typography variant="h6">Parking Violations Detected</Typography>
      {violations.length === 0 ? <CircularProgress /> : violations.map((v, i) => (
        <Card key={i} sx={{ my: 2 }}>
          <CardContent>
            <Typography><b>Vehicle:</b> {v.plate}</Typography>
            <Typography><b>Zone:</b> {v.zone}</Typography>
            <Typography><b>Evidence:</b> {v.imageUrl}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ParkingViolation;