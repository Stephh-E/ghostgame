import React from 'react';
import mapsquare from '../assets/mapsquare.png';
import Ghost from './Ghost.jsx';
import Enemy from './Enemy.jsx';

const Map = () => {
  const enemyPositions = [
    { x: 100, y: 150 },
    { x: 200, y: 200 },
    { x: 300, y: 250 },
  ]; // Define initial positions for enemies

  return (
    <div style={{
      position: 'relative',
      width: '250vw', // Full viewport width
      height: '250vh', // Full viewport height
      overflow: 'hidden', // Prevents scrolling
      backgroundImage: `url(${mapsquare})`,
      backgroundSize: 'contain',
      backgroundPosition: 'left',
      backgroundRepeat: 'no-repeat'
    }}>
      <Ghost /> {/* Render the Ghost component */}
      {enemyPositions.map((pos, index) => (
        <Enemy key={index} position={pos} />
      ))}
    </div>
  );
};

export default Map;