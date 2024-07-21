import axios from 'axios';

export const chunkText = (text, batchSize = 3) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let batches = [];

  for (let i = 0; i < sentences.length; i += batchSize) {
    const batch = sentences.slice(i, i + batchSize).join(' ');
    batches.push(batch);
  }

  return batches;
};

export const handleProcessText = async (text, setLoading, contentDivRef, updateContentDiv) => {
  console.log('handleprocess activated...');
  setLoading(true);
  contentDivRef.current.innerHTML = ''; // Clear the existing content
  const chunks = chunkText(text);
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

export const pasteDemoText = (setText, contentDivRef) => {
  const demoText = "ik heb gister naar de bioschoop geweest met mijn vriend. we hebben een leuke film gezien, maar de popkorn was te duur. daarna hebben we naar een restaurant gegaan om te eten. we was zo hongur dat we bijna alles van het menu hebben bestelt. de serveerster heeft ons het besteling vergete, dus we moest lang wachten. uiteindelijk, hebben we lekker gegeten en zijn naar huis gegaan. het was een gezellige avond, maar de volgende keer gaan we naar een andere resaurant want deze was niet zo goed.";
  setText(demoText);
  contentDivRef.current.innerText = demoText;
};

export const clearTextField = (setText, contentDivRef) => {
    setText('');
    contentDivRef.current.innerHTML = '';
  };