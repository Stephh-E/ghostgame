import React from 'react';
import mapsquare from '../assets/mapsquare.png';
import Ghost from './Ghost.jsx';
import Enemy from './Enemy.jsx';

const Map = () => {
    const enemies = [
      { position: { x: 100, y: 100 } },
      { position: { x: 200, y: 200 } },
      { position: { x: 300, y: 300 } },
    ]; // Add your logic to manage enemies

    return (
      <div style={{
        position: 'relative',
        width: '250vw',
        height: '250vh',
        overflow: 'hidden',
        backgroundImage: `url(${mapsquare})`,
        backgroundSize: 'contain',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat'
      }}>
        <Ghost enemies={enemies} /> {/* Pass the enemies to the Ghost component */}
        {/* Render enemies here as well */}
        {enemies.map((enemy, index) => (
          <Enemy key={index} position={enemy.position} />
        ))}
      </div>
    );
};

export default Map;
