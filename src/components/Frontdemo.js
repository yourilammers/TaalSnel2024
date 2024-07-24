// src/components/Frontdemo.js
import React, { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { handleProcessText, pasteDemoText, clearTextField } from './FrontdemoSupport';
import './Frontdemo.css';

function Frontdemo({ onExplainMistake }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const contentDivRef = useRef(null);
  const tooltipRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        tooltipRef.current.style.display = 'none';
        tooltipRef.current = null;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const countMistakes = () => {
      if (contentDivRef.current) {
        const count = contentDivRef.current.querySelectorAll('.highlight').length;
        setMistakeCount(count);
      }
    };
    countMistakes();
  }, [text]);

  useEffect(() => {
    const countCharacters = () => {
      if (contentDivRef.current) {
        const count = contentDivRef.current.innerText.length;
        setCharCount(count);
      }
    };
    countCharacters();
  }, [text]);

  const replaceWord = (event, originalWord, correctedWord) => {
    event.stopPropagation();
    const span = wordRef.current;
    if (span) {
      span.innerText = correctedWord;
      span.classList.remove('highlight-g', 'highlight-s');
      if (tooltipRef.current) {
        tooltipRef.current.style.display = 'none';
        tooltipRef.current = null;
        wordRef.current = null;
      }
      setText((prevText) => prevText.replace(originalWord, correctedWord));
      setMistakeCount((prevCount) => prevCount - 1);
    }
  };

  const findRelevantSentence = (text, word) => {
    const sentences = text.match(/[^.!?]*[.!?]/g) || [text];
    return sentences.find(sentence => sentence.includes(word)) || '';
  };
  

  const createTooltipContent = (word) => {
    const sentence = findRelevantSentence(text, word.w);
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-header">${word.t === 'g' ? 'Grammar' : 'Spelling'} correction</div>
      <div class="tooltip-divider"></div>
      <div class="tooltip-body">
        <div>${word.w} &#8594; ${word.c}</div>
      </div>
      <div class="tooltip-divider"></div>
      <div class="tooltip-footer">
        <button class="apply-correction">Apply Correction</button>
        <button class="explain-mistake">Explain mistake</button>
      </div>
    `;

    tooltip.querySelector('.apply-correction').onclick = (event) => replaceWord(event, word.w, word.c);
    tooltip.querySelector('.explain-mistake').onclick = (event) => onExplainMistake(sentence, word.w, word.c);
    return tooltip;
  };

  const updateContentDiv = (corrections) => {
    const contentDiv = contentDivRef.current;
  
    corrections.forEach((correction) => {
      correction.words.forEach((word, i) => {
        if (word.c) {
          const span = document.createElement('span');
          span.className = `highlight highlight-${word.t}`;
          span.onclick = (event) => showTooltip(event, word);
          span.innerText = word.w;
  
          contentDiv.appendChild(span);
        } else {
          const textNode = document.createTextNode(word.w);
          contentDiv.appendChild(textNode);
        }
        if (i < correction.words.length - 1) {
          contentDiv.appendChild(document.createTextNode(' ')); // Add space between words
        }
      });
      contentDiv.appendChild(document.createTextNode(' ')); // Add space after each sentence
    });
  
    // Update mistake count
    const count = contentDiv.querySelectorAll('.highlight').length;
    setMistakeCount(count);
  };
  
  const showTooltip = (event, word) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }

    const tooltip = createTooltipContent(word, text);
    document.body.appendChild(tooltip);
    tooltipRef.current = tooltip;
    wordRef.current = event.currentTarget;

    const rect = event.currentTarget.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.display = 'block';
  };

  return (
    <Box className='demo-box'>
      <Box className='demo-box-header'>
        TaalSnel Demo
      </Box>
      <Box
        ref={contentDivRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setText(e.currentTarget.innerText)}
        className="editable-content"
        spellCheck="false"
      >
      </Box>
      <Box className='demo-box-footer'>
        <Button
          onClick={() => handleProcessText(text, setLoading, contentDivRef, updateContentDiv)}
          disabled={loading}
          variant="contained"
          sx={{ mr: 1 }}
        >
          {loading ? 'Processing...' : 'Process Text'}
        </Button>
        <Button
          onClick={() => pasteDemoText(setText, contentDivRef)}
          disabled={loading}
          variant="contained"
          sx={{ mr: 1 }}
        >
          Demo Text
        </Button>
        <Button
          onClick={() => clearTextField(setText, contentDivRef)}
          disabled={loading}
          variant="contained"
          sx={{ mr: 1 }}
        >
          Clear
        </Button>
        <div
          className="char-counter"
          style={{
            color: 'black',
            padding: '5px 10px',
            fontSize: '14px',
            userSelect: 'none',
            pointerEvents: 'none',
            display: 'inline-flex',
          }}
        >
          {charCount} / 1000 characters
        </div>
        <div
          className="mistake-counter"
          style={{
            backgroundColor: '#eb5757',
            borderRadius: '50%',
            color: 'white',
            padding: '5px 10px',
            fontSize: '14px',
            userSelect: 'none',
            pointerEvents: 'none',
            display: 'inline-flex',
            float: 'right',
          }}
        >
          {mistakeCount}
        </div>
      </Box>
    </Box>
  );
}

export default Frontdemo;
