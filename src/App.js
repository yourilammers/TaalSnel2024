import React, { useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Frontdemo from './components/Frontdemo';
import RuleExplanation from './components/RuleExplanation';
import Features from './components/Features';
import getLPTheme from './getLPTheme';
import './App.css';

function App() {
  const ruleExplanationRef = useRef();
  const [mode, setMode] = useState('light');

  const handleExplainMistake = (sentence, incorrectWord, correctWord) => {
    if (ruleExplanationRef.current) {
      ruleExplanationRef.current.explainMistake(sentence, incorrectWord, correctWord);
    }
  };
  
  document.title = 'TaalSnel';

  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <div className="columns">
          <div className="frontdemo">
            <Frontdemo onExplainMistake={handleExplainMistake} />
          </div>
          <div className="RuleExplanation">
            <RuleExplanation ref={ruleExplanationRef} />
          </div>
        </div>
        <Features />
      </Box>
    </ThemeProvider>
  );
}

export default App;
