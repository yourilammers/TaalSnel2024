import React, { useRef } from 'react';
import { Hero, Frontdemo } from './components';
import AppAppBar from './components/AppAppBar';
import RuleExplanation from './components/RuleExplanation';
import './App.css';

function App() {
  const ruleExplanationRef = useRef();

  const handleExplainMistake = (sentence, incorrectWord, correctWord) => {
    if (ruleExplanationRef.current) {
      ruleExplanationRef.current.explainMistake(sentence, incorrectWord, correctWord);
    }
  };

  return (
    <div className="App">
      <AppAppBar />
      <Hero />
      <div className="columns">
        <div className="frontdemo">
          <Frontdemo onExplainMistake={handleExplainMistake} />
        </div>
        <div className="RuleExplanation">
          <RuleExplanation ref={ruleExplanationRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
