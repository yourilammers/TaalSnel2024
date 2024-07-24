import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Box, Button } from '@mui/material';
import './RuleExplanation.css';

// Function to determine the redirect URI based on the current hostname
const getRedirectUri = () => {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:7071/api/ExplainMistakeFunction';
  } else {
    return 'https://taalsnel-function-app.azurewebsites.net/api/explainmistakefunction';
  }
};


const RuleExplanation = forwardRef((props, ref) => {
  const [content, setContent] = useState('<p>Select a correction to see the explanation here.</p>');

  const fetchExplanation = async (sentence, incorrectWord, correctWord) => {
    try {
      const response = await fetch(getRedirectUri(), {
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
