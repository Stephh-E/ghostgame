import React, { useState, useEffect } from 'react';
import ghost1 from '../assets/ghost1.png'; // Path to ghost1 image
import ghost2 from '../assets/ghost2.png'; // Path to ghost2 image

const Ghost = () => {
  const [currentImage, setCurrentImage] = useState(ghost1);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Initial position

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => 
        prevImage === ghost1 ? ghost2 : ghost1
      );
    }, 500); // Change image every 500ms

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      let newPosition = { ...position };

      switch (key) {
        case 'ArrowUp':
          newPosition.y -= 10; // Move up
          break;
        case 'ArrowDown':
          newPosition.y += 10; // Move down
          break;
        case 'ArrowLeft':
          newPosition.x -= 10; // Move left
          break;
        case 'ArrowRight':
          newPosition.x += 10; // Move right
          break;
        default:
          break;
      }

      // Update position
      setPosition(newPosition);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup on unmount
    };
  }, [position]);

  const ghostStyle = {
    position: 'absolute', // Position relative to the parent (Map)
    width: '64px',       // Set width of the ghost image
    height: '64px',      // Set height of the ghost image
    backgroundImage: `url(${currentImage})`,
    backgroundSize: 'contain', // Ensure the image is contained within the specified dimensions
    bottom: `${position.y}px`,  // Use dynamic position
    left: `${position.x}px`,     // Use dynamic position
  };

  return <div style={ghostStyle} />;
};

export default Ghost;