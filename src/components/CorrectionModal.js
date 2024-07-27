import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

function CorrectionCard({ correction, replaceWord }) {
  return (
    <Paper sx={{ p: 2, maxWidth: 300, boxShadow: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">
          {correction.t === 'g' ? 'Grammar Correction' : 'Spelling Correction'}
        </Typography>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Original: {correction.w}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        Suggested: {correction.c}
      </Typography>
      <Button
        onClick={() => replaceWord(correction.w, correction.c)}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        fullWidth
      >
        Apply Correction
      </Button>
    </Paper>
  );
}

export default CorrectionCard;
