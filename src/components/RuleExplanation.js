import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Button } from '@mui/material';
import './RuleExplanation.css';

const RuleExplanation = forwardRef((props, ref) => {
  const [content, setContent] = useState('<p>Select a correction to see the explanation here.</p>');

  const fetchExplanation = async (sentence, incorrectWord, correctWord) => {
    try {
      const response = await fetch('http://localhost:7071/api/ExplainMistakeFunction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence, incorrect_word: incorrectWord, correct_word: correctWord }),
      });

      const data = await response.json();
      if (response.ok) {
        setContent(`<p>${data.explanation}</p>`);
      } else {
        setContent(`<p>Error: ${data.error}</p>`);
      }
    } catch (error) {
      setContent(`<p>Request failed: ${error.message}</p>`);
    }
  };

  useImperativeHandle(ref, () => ({
    explainMistake: fetchExplanation,
  }));

  return (
    <Box className='demo-box'>
      <Box className='demo-box-header'>
        Rule Explanation
      </Box>
      <Box className='demo-rule-explanation' sx={{ overflow: 'hidden', overflowY: 'auto', maxHeight: '400px' }} dangerouslySetInnerHTML={{ __html: content }}>
      </Box>
      <Box className='demo-box-footer'>
        <Button variant="contained" sx={{ mr: 1 }}>
          Thanks
        </Button>
      </Box>
    </Box>
  );
});

export default RuleExplanation;
