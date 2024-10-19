import React, { useState, useEffect } from 'react';
import ghost1 from '../assets/ghost1.png';
import ghost2 from '../assets/ghost2.png';
import deadGhost from '../assets/deadghost.png';

const Ghost = ({ enemies }) => {
  const [currentImage, setCurrentImage] = useState(ghost1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState(position);
  const [velocity, setVelocity] = useState(5);
  const [isDead, setIsDead] = useState(false);
  const gridSize = 10; // Grid size for movement

  const boundary = {
    left: 0,
    right: window.innerWidth - 64,
    top: 0,
    bottom: window.innerHeight - 64,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDead) {
        setCurrentImage((prevImage) => 
          prevImage === ghost1 ? ghost2 : ghost1
        );
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isDead]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isDead) return;
  
      const { key } = event;
  
      // Check if the pressed key is an arrow key
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        event.preventDefault(); // Prevent default scrolling behavior
  
        let newTargetPosition = { ...targetPosition };
  
        switch (key) {
          case 'ArrowUp':
            newTargetPosition.y = Math.max(newTargetPosition.y - gridSize, boundary.top);
            break;
          case 'ArrowDown':
            newTargetPosition.y = Math.min(newTargetPosition.y + gridSize, boundary.bottom);
            break;
          case 'ArrowLeft':
            newTargetPosition.x = Math.max(newTargetPosition.x - gridSize, boundary.left);
            break;
          case 'ArrowRight':
            newTargetPosition.x = Math.min(newTargetPosition.x + gridSize, boundary.right);
            break;
          default:
            break;
        }
  
        if (newTargetPosition !== targetPosition) {
          setTargetPosition(newTargetPosition);
          setVelocity(10); // Increase velocity on first press
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetPosition, isDead]);
  

  const checkCollision = () => {
    if (isDead) return;

    enemies.forEach((enemy) => {
      const enemyRect = {
        left: enemy.position.x,
        right: enemy.position.x + 64,
        top: enemy.position.y,
        bottom: enemy.position.y + 64,
      };

      const ghostRect = {
        left: position.x,
        right: position.x + 64,
        top: position.y,
        bottom: position.y + 64,
      };

      if (
        ghostRect.right > enemyRect.left &&
        ghostRect.left < enemyRect.right &&
        ghostRect.bottom > enemyRect.top &&
        ghostRect.top < enemyRect.bottom
      ) {
        setIsDead(true);
      }
    });
  };

  useEffect(() => {
    const animate = () => {
      setPosition((prevPosition) => {
        const distanceX = targetPosition.x - prevPosition.x;
        const distanceY = targetPosition.y - prevPosition.y;

        const newX = prevPosition.x + (distanceX > 0 ? Math.min(velocity, distanceX) : Math.max(-velocity, distanceX));
        const newY = prevPosition.y + (distanceY > 0 ? Math.min(velocity, distanceY) : Math.max(-velocity, distanceY));

        return { x: newX, y: newY };
      });

      checkCollision();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup if necessary
    };
  }, [targetPosition, velocity, enemies, isDead]);

  const ghostStyle = {
    position: 'absolute',
    width: '64px',
    height: '64px',
    backgroundImage: `url(${isDead ? deadGhost : currentImage})`,
    backgroundSize: 'contain',
    left: position.x,
    top: position.y,
  };

  return <div style={ghostStyle} />;
};

export default Ghost;
