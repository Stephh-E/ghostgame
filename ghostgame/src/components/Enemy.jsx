import React, { useEffect, useState } from 'react';
import enemy1 from '../assets/enemy1.png';
import enemy2 from '../assets/enemy2.png';

const Enemy = ({ position }) => {
  const [enemyPosition, setEnemyPosition] = useState(position);
  const [currentImage, setCurrentImage] = useState(enemy1);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const changeDirection = () => {
      const newDirection = Math.floor(Math.random() * 4);
      setDirection(newDirection);
    };

    // Change direction every 2 seconds
    const directionInterval = setInterval(changeDirection, 2000);

    // Move the enemy in the current direction
    const moveInterval = setInterval(() => {
      if (direction !== null) {
        const newPosition = { ...enemyPosition };
        let newDirection = direction;

        switch (direction) {
          case 0: // Move up
            newPosition.y -= 10; // Move 5 pixels up
            if (newPosition.y < 0) newDirection = 1; // Hit top boundary, go down
            break;
          case 1: // Move down
            newPosition.y += 10; // Move 5 pixels down
            if (newPosition.y > window.innerHeight - 64) newDirection = 0; // Hit bottom boundary, go up
            break;
          case 2: // Move left
            newPosition.x -= 10; // Move 5 pixels left
            if (newPosition.x < 0) newDirection = 3; // Hit left boundary, go right
            break;
          case 3: // Move right
            newPosition.x += 10; // Move 5 pixels right
            if (newPosition.x > window.innerWidth - 64) newDirection = 2; // Hit right boundary, go left
            break;
          default:
            break;
        }

        setEnemyPosition(newPosition);
        setDirection(newDirection); // Update direction if boundary is hit

        // Cycle through images
        setCurrentImage(prevImage => (prevImage === enemy1 ? enemy2 : enemy1));
      }
    }, 100); // Move every 100ms for smoother movement

    return () => {
      clearInterval(directionInterval);
      clearInterval(moveInterval);
    };
  }, [enemyPosition, direction]);

  const enemyStyle = {
    position: 'absolute',
    left: enemyPosition.x,
    top: enemyPosition.y,
    width: '64px',
    height: '64px',
    backgroundImage: `url(${currentImage})`,
    backgroundSize: 'contain',
  };

  return <div style={enemyStyle} />;
};

export default Enemy;
