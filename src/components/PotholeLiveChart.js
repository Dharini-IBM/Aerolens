import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Typography, Box } from '@mui/material';

const COLORS = ['#f5222d', '#faad14', '#52c41a'];

export default function PotholeLiveChart({ potholes }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    potholes.forEach(p => { counts[p.severity] = (counts[p.severity] || 0) + 1; });
    setData([
      { name: 'High', value: counts.High },
      { name: 'Medium', value: counts.Medium },
      { name: 'Low', value: counts.Low }
    ]);
  }, [potholes]);

  return (
    <Card sx={{ p: 2, borderRadius: 3, boxShadow: 4, bgcolor: '#fff', minWidth: 500, maxWidth: 700 }}>
      <Typography variant="h6" align="center" fontWeight={700} mb={2} color="primary.main">
        Severity Breakdown
      </Typography>
      <Box sx={{ width: '100%', height: 340 }}>
        <ResponsiveContainer width={600} height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="42%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              isAnimationActive={true}
            >
              {data.map((entry, idx) => (
                <Cell key={entry.name} fill={COLORS[idx]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend 
              verticalAlign="middle" 
              align="right" 
              layout="vertical" 
              iconType="circle"
              wrapperStyle={{ fontSize: 16, right: 0 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
} 