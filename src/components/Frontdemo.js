import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import './Frontdemo.css';  // Import the CSS file

function Frontdemo() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const contentDivRef = useRef(null);
  const tooltipRef = useRef(null);

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

  const chunkText = (text, batchSize = 3) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let batches = [];

    for (let i = 0; i < sentences.length; i += batchSize) {
      const batch = sentences.slice(i, i + batchSize).join(' ');
      batches.push(batch);
    }

    return batches;
  };

  const handleProcessText = async () => {
    console.log('handleprocess activated...');
    setLoading(true);
    contentDivRef.current.innerHTML = ''; // Clear the existing content
    const chunks = chunkText(text);
    // https://taalsnel-function-app.azurewebsites.net/api/processtextfunction
    // http://localhost:7071/api/ProcessTextFunction
    for (const chunk of chunks) {
      try {
        const response = await axios.post('https://taalsnel-function-app.azurewebsites.net/api/processtextfunction', { text: chunk });
        console.log('API Response:', response.data); // Debugging
        updateContentDiv(response.data.correctedText);
      } catch (error) {
        console.error('Error processing text:', error);
      }
    }

    setLoading(false);
  };

  const replaceWord = (event, correctedWord) => {
    event.stopPropagation();
    const span = event.currentTarget.closest('.highlight');
    span.innerText = correctedWord;
    span.classList.remove('highlight-g', 'highlight-s');
    const tooltip = span.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
    tooltipRef.current = null;
  };

  const updateContentDiv = (corrections) => {
    const contentDiv = contentDivRef.current;

    corrections.forEach((correction) => {
      correction.words.forEach((word, i) => {
        if (word.c) {
          const span = document.createElement('span');
          span.className = `highlight highlight-${word.t}`;
          span.onclick = showTooltip;
          span.innerText = word.w;

          const tooltip = document.createElement('span');
          tooltip.className = 'tooltip';
          const button = document.createElement('button');
          button.innerText = word.c;
          button.onclick = (event) => replaceWord(event, word.c);

          tooltip.innerHTML = `${word.t === 'g' ? 'Grammar' : 'Spelling'} correction: `;
          tooltip.appendChild(button);
          span.appendChild(tooltip);

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
  };

  const showTooltip = (event) => {
    const tooltip = event.currentTarget.querySelector('.tooltip');
    if (tooltipRef.current === tooltip) {
      tooltip.style.display = 'none';
      tooltipRef.current = null;
    } else {
      if (tooltipRef.current) {
        tooltipRef.current.style.display = 'none';
      }
      tooltip.style.display = 'block';
      tooltipRef.current = tooltip;
    }
  };

  const pasteDemoText = () => {
    const demoText = "ik heb gister naar de bioschoop geweest met mijn vriend. we hebben een leuke film gezien, maar de popkorn was te duur. daarna hebben we naar een restaurant gegaan om te eten. we was zo hongur dat we bijna alles van het menu hebben bestelt. de serveerster heeft ons het besteling vergete, dus we moest lang wachten. uiteindelijk, hebben we lekker gegeten en zijn naar huis gegaan. het was een gezellige avond, maar de volgende keer gaan we naar een andere resaurant want deze was niet zo goed.";
    setText(demoText);
    contentDivRef.current.innerText = demoText;
  };

  return (
    <Box textAlign="center" sx={{ padding: '20px' }}>
      <Box
        ref={contentDivRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setText(e.currentTarget.innerText)}
        className="editable-content"
        spellCheck="false"
      ></Box>
      <br />
      <Button
        onClick={handleProcessText}
        disabled={loading}
        variant="contained"
        sx={{ mt: 2 }}
      >
        {loading ? 'Processing...' : 'Process Text'}
      </Button>
      <Button
        onClick={pasteDemoText}
        disabled={loading}
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
      >
        Demo Text
      </Button>
    </Box>
  );
}

export default Frontdemo;
