import React from 'react';
import { Button } from '@mui/material';

function CorrectionCard({ correction, replaceWord }) {
  return (
    <div className="correction-card">
      <h4>{correction.t === 'g' ? 'Grammar Correction' : 'Spelling Correction'}</h4>
      <p>Original: {correction.w}</p>
      <p>Suggested: {correction.c}</p>
      <Button
        variant="contained"
        onClick={(event) => replaceWord(event, correction.w, correction.c)}
      >
        Apply Correction
      </Button>
    </div>
  );
}

export default CorrectionCard;
