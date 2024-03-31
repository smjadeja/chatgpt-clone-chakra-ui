import { useState, useEffect } from 'react';

const TypingEffect = () => {
  const messages = [
    "Hello there!",
    "How can I assist you today?",
    "Feel free to ask me anything.",
    "I'm here to help.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100; // Adjust typing speed and backspacing speed here

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === messages[currentIndex]) {
        setIsDeleting(true);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }

      const nextCharIndex = isDeleting ? currentText.length - 1 : currentText.length + 1;
      setCurrentText(messages[currentIndex].substring(0, nextCharIndex));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, messages]);

  return (
    <div>
      <span>{currentText}</span>
      <span className="typing-cursor">|</span>
    </div>
  );
};

export default TypingEffect;
