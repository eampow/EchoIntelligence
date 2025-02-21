// src/components/TrackSummary.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function TrackSummary() {
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/summary')
      .then(response => {
        setSummary(response.data.summary || []);
      })
      .catch(err => {
        console.error("Error fetching summary:", err);
        setError("Failed to load track summary.");
      });
  }, []);

  const columns = [
    { field: 'TrackID', headerName: 'Track ID', width: 100 },
    { field: 'NumPoints', headerName: 'Num Points', width: 120 },
    { field: 'AvgTS', headerName: 'Avg TS (dB)', width: 120 },
    { field: 'AvgSpeed', headerName: 'Avg Speed', width: 120 },
    { field: 'PredSpecies', headerName: 'Predicted Species', width: 150 }
  ];

  const rows = summary.map((row, index) => ({ id: index, ...row }));

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Track Summary</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {!error && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </div>
      )}
    </Paper>
  );
}

export default TrackSummary;
