import React from 'react';
import mapsquare from '../assets/mapsquare.png';
import Ghost from './Ghost.jsx';

const Map = () => {
    return (
      <div style={{
        position: 'relative',
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        overflow: 'hidden', // Prevents scrolling
        backgroundImage: `url(${mapsquare})`,
        backgroundSize: 'contain', // Cover the entire area
        backgroundPosition: 'left', // image on the left
        backgroundRepeat: 'no-repeat'
      }}>
        <Ghost /> {/* Render the Ghost component */}
        </div>
    );
  };
  
  export default Map;
