import React, { useEffect, useState } from 'react';
import enemy1 from '../assets/enemy1.png'; // Path to enemy1 image
import enemy2 from '../assets/enemy2.png'; // Path to enemy2 image

const Enemy = ({ position }) => {
  const [enemyPosition, setEnemyPosition] = useState(position);
  const [currentImage, setCurrentImage] = useState(enemy1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change direction (up, down, left, right)
      const direction = Math.floor(Math.random() * 4); // 0: up, 1: down, 2: left, 3: right
      const newPosition = { ...enemyPosition };

      switch (direction) {
        case 0: // Move up
          newPosition.y = Math.max(0, newPosition.y - 10);
          break;
        case 1: // Move down
          newPosition.y = Math.min(window.innerHeight - 64, newPosition.y + 10);
          break;
        case 2: // Move left
          newPosition.x = Math.max(0, newPosition.x - 10);
          break;
        case 3: // Move right
          newPosition.x = Math.min(window.innerWidth - 64, newPosition.x + 10);
          break;
        default:
          break;
      }

      setEnemyPosition(newPosition);

      // Cycle through images
      setCurrentImage(prevImage => (prevImage === enemy1 ? enemy2 : enemy1));

    }, 1000); // Change direction every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [enemyPosition]);

  const enemyStyle = {
    position: 'absolute',
    left: enemyPosition.x,
    top: enemyPosition.y,
    width: '64px', // Set the width of the enemy image
    height: '64px', // Set the height of the enemy image
    backgroundImage: `url(${currentImage})`,
    backgroundSize: 'contain',
  };

  return <div style={enemyStyle} />;
};

export default Enemy;