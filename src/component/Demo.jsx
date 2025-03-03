import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const ratings = {
  location: 4.1,
  cleanliness: 3.9,
  valueForMoney: 3.7,
  food: 4.2,
  facilities: 3.9,
  checkInExperience: 4.7
};

const RatingBar = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>{label}</Typography>
      <Typography variant="body2">{value.toFixed(1)}/5</Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={(value / 5) * 100} 
      sx={{
        height: 8,
        borderRadius: 2,
        "& .MuiLinearProgress-bar": { backgroundColor: "#FF6A63" } // Custom color
      }}
    />
  </Box>
);

const Demo = () => (
  <Box sx={{ width: "100%", maxWidth: 400, p: 2, border: "1px solid #ddd", borderRadius: 2, boxShadow: 3 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
      Ratings
    </Typography>
    {Object.entries(ratings).map(([key, value]) => (
      <RatingBar key={key} label={key.replace(/([A-Z])/g, ' $1')} value={value} />
    ))}
  </Box>
);

export default Demo;
