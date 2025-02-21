// src/components/TrackedEchogram.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box } from '@mui/material';

function TrackedEchogram() {
  const [plotData, setPlotData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/plot/tracked-echogram')
      .then(response => {
        setPlotData(response.data);
      })
      .catch(err => {
        console.error("Error fetching tracked echogram:", err);
        setError("Failed to load tracked echogram.");
      });
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Tracked Echogram (with Predicted Species)</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {plotData ? (
        <Box sx={{ mt: 2 }}>
          <Plot
            data={plotData.data}
            layout={plotData.layout}
            style={{ width: '100%', height: '500px' }}
            useResizeHandler={true}
          />
        </Box>
      ) : (
        <Typography>Loading tracked echogram...</Typography>
      )}
    </Paper>
  );
}

export default TrackedEchogram;
