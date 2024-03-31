import { useState, useRef } from 'react';
import { VStack, ListItem, List, Button } from '@chakra-ui/react';

const ScrollableList = () => {
  const [listItems, setListItems] = useState<string[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  // Function to scroll to the bottom of the list
  

  // Automatically scroll to bottom whenever listItems change
 

  // Function to handle appending new items to the list
  const handleAppendItem = () => {
    const newItem = `Item ${listItems.length + 1}`;
    setListItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <VStack align="flex-start" spacing={4}>
      <Button onClick={handleAppendItem}>Append Item</Button>
      <List ref={listRef} h="300px" overflowY="auto">
        {listItems.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default ScrollableList;
