import React, { useState, useEffect } from 'react';
import ghost1 from '../assets/ghost1.png'; // Path to ghost1 image
import ghost2 from '../assets/ghost2.png'; // Path to ghost2 image

const Ghost = () => {
  const [currentImage, setCurrentImage] = useState(ghost1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => 
        prevImage === ghost1 ? ghost2 : ghost1
      );
    }, 500); // Change image every 500ms

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const ghostStyle = {
    position: 'absolute', // Position relative to the parent (Map)
    width: '64px',       // Set width of the ghost image
    height: '64px',      // Set height of the ghost image
    backgroundImage: `url(${currentImage})`,
    backgroundSize: 'contain', // Ensure the image is contained within the specified dimensions
    top: '50%',           // Vertical position (adjust as needed)
    left: '50%',          // Horizontal position (adjust as needed)
    transform: 'translate(-50%, -50%)', // Center the ghost
  };

  return <div style={ghostStyle} />;
};

export default Ghost;