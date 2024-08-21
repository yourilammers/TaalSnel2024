import React, { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { handleProcessText, pasteDemoText, clearTextField } from './FrontdemoSupport';
import './Frontdemo.css';

function Frontdemo() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const contentDivRef = useRef(null);
  const tooltipRef = useRef(null);
  const wordRef = useRef(null);
  const [correctionsList, setCorrectionsList] = useState([]);

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

  const replaceWord = (originalWord, correctedWord) => {
    const spans = contentDivRef.current.querySelectorAll('.highlight');
  
    spans.forEach((span) => {
      if (span.innerText === originalWord) {
        span.innerText = correctedWord;
        span.classList.remove('highlight-g', 'highlight-s');
        setText((prevText) => prevText.replace(originalWord, correctedWord));
        setMistakeCount((prevCount) => prevCount - 1);

        // Remove correction from the list
        setCorrectionsList((prevList) =>
          prevList.filter((correction) => correction.original !== originalWord)
        );
      }
    });
  };

  const createTooltipContent = (word, sentence) => {
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
      </div>
    `;

    tooltip.querySelector('.apply-correction').onclick = () => replaceWord(word.w, word.c);
    return tooltip;
  };

  const updateContentDiv = (corrections) => {
    const contentDiv = contentDivRef.current;
    const newCorrectionsList = [];

    corrections.forEach((correction) => {
      const sentenceText = correction.words.map((word) => word.w).join(' ');
      correction.words.forEach((word, i) => {
        if (word.c) {
          const span = document.createElement('span');
          span.className = `highlight highlight-${word.t}`;
          span.dataset.sentence = sentenceText;
          span.onclick = (event) => showTooltip(event, word, span.dataset.sentence);
          span.innerText = word.w;

          contentDiv.appendChild(span);

          // Add correction to the newCorrectionsList
          newCorrectionsList.push({ original: word.w, corrected: word.c, type: word.t });
        } else {
          const textNode = document.createTextNode(word.w);
          contentDiv.appendChild(textNode);
        }
        if (i < correction.words.length - 1) {
          contentDiv.appendChild(document.createTextNode(' '));
        }
      });
      contentDiv.appendChild(document.createTextNode(' '));
    });

    // Update mistake count
    const count = contentDiv.querySelectorAll('.highlight').length;
    setMistakeCount(count);

    // Accumulate corrections in the correctionsList state
    setCorrectionsList((prevCorrectionsList) => [...prevCorrectionsList, ...newCorrectionsList]);
  };

  const showTooltip = (event, word, sentence) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.display = 'none';
    }

    const tooltip = createTooltipContent(word, sentence);
    document.body.appendChild(tooltip);
    tooltipRef.current = tooltip;
    wordRef.current = event.currentTarget;

    const rect = event.currentTarget.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + window.scrollY}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.display = 'block';
  };

  return (
    <Box className="demo-container mx-auto max-w-7xl px-6 lg:px-8">
      <Box className="demo-box-left">
        <Box className="demo-box-header">TaalSnel Demo</Box>
        <Box
          ref={contentDivRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setText(e.currentTarget.innerText)}
          className="editable-content"
          spellCheck="false"
        >
        </Box>
        <Box className="demo-box-footer">
          <Button
            onClick={() => handleProcessText(text, setLoading, contentDivRef, updateContentDiv, setCorrectionsList)}
            disabled={loading}
            variant="contained"
            sx={{ mr: 1 }}
          >
            {loading ? 'Processing...' : 'Process Text'}
          </Button>
          <Button
            onClick={() => pasteDemoText(setText, contentDivRef, setCorrectionsList)}
            disabled={loading}
            variant="contained"
            sx={{ mr: 1 }}
          >
            Demo Text
          </Button>
          <Button
            onClick={() => clearTextField(setText, contentDivRef, setCorrectionsList)}
            disabled={loading}
            variant="contained"
            sx={{ mr: 1 }}
          >
            Clear
          </Button>
          <div className="char-counter">{charCount} / 1000 characters</div>
          <div className="mistake-counter">{mistakeCount}</div>
        </Box>
      </Box>

      <Box className="demo-box-right">
        <Box className="demo-box-header">Correction list</Box>
        <Box className="demo-box-right-content">
          <ul>
            {correctionsList.map((correction, index) => (
              <li
                className="correction-list-item"
                key={index}
                onClick={() => replaceWord(correction.original, correction.corrected)}
                style={{ cursor: 'pointer' }}
              >
                <span
                  className={
                    correction.type === 'g' ? 'circle-grammar' : 'circle-spelling'
                  }
                ></span>
                {correction.original} → {correction.corrected}
              </li>
            ))}
          </ul>
        </Box>
        <Box className="demo-box-footer">
          <Button variant="contained" sx={{ mr: 1 }}>Apply All</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Frontdemo;
