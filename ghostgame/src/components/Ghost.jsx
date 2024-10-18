import React, { useState, useEffect } from 'react';
import ghost1 from '../assets/ghost1.png';
import ghost2 from '../assets/ghost2.png';

const Ghost = () => {
  const [currentImage, setCurrentImage] = useState(ghost1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState(position);
  const [velocity, setVelocity] = useState(5); // Initial velocity
  const gridSize = 10; // Grid size for movement

  // Define the boundaries based on your map dimensions
  const boundary = {
    left: 0,
    right: window.innerWidth - 64, // Adjust based on ghost's width
    top: 0,
    bottom: window.innerHeight - 64, // Adjust based on ghost's height
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => 
        prevImage === ghost1 ? ghost2 : ghost1
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      event.preventDefault(); // Prevent default scrolling behavior
      let newTargetPosition = { ...targetPosition };

      switch (key) {
        case 'ArrowUp':
          newTargetPosition.y = Math.max(newTargetPosition.y - gridSize, 0);
          break;
        case 'ArrowDown':
          newTargetPosition.y = Math.min(newTargetPosition.y + gridSize, window.innerHeight - 64);
          break;
        case 'ArrowLeft':
          newTargetPosition.x = Math.max(newTargetPosition.x - gridSize, 0);
          break;
        case 'ArrowRight':
          newTargetPosition.x = Math.min(newTargetPosition.x + gridSize, window.innerWidth - 64);
          break;
        default:
          break;
      }

      // Set target position and increase velocity on first press
      if (newTargetPosition !== targetPosition) {
        setTargetPosition(newTargetPosition);
        setVelocity(10); // Increase velocity on first press
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetPosition]);

  useEffect(() => {
    const animate = () => {
      // Smoothly move towards the target position
      setPosition((prevPosition) => {
        const distanceX = targetPosition.x - prevPosition.x;
        const distanceY = targetPosition.y - prevPosition.y;

        const newX = prevPosition.x + (distanceX > 0 ? Math.min(velocity, distanceX) : Math.max(-velocity, distanceX));
        const newY = prevPosition.y + (distanceY > 0 ? Math.min(velocity, distanceY) : Math.max(-velocity, distanceY));
        
        return { x: newX, y: newY };
      });

      requestAnimationFrame(animate);
    };

    animate(); // Start the animation loop

    return () => {
      // Cleanup if necessary
    };
  }, [targetPosition, velocity]);

  const ghostStyle = {
    position: 'absolute',
    width: '64px',
    height: '64px',
    backgroundImage: `url(${currentImage})`,
    backgroundSize: 'contain',
    left: position.x,
    top: position.y,
  };

  return <div style={ghostStyle} />;
};

export default Ghost;
