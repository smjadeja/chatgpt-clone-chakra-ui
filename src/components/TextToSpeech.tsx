import { useState } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!speaking && text.trim() !== '') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    
    <Box
    width={{base:"90%", lg:"65%"}}
    >
    <Textarea
        
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter text to speak..."
    />
    <Button onClick={speak}>{speaking ? 'Speaking...' : 'Speak'}</Button>
    </Box>
    
    
  );
};

export default TextToSpeech;
