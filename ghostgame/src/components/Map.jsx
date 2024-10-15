import mapsquare from '../assets/mapsquare.png'

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
        {/* Other components like Ghost, Candles, etc., can be rendered here */}
      </div>
    );
  };
  
  export default Map;
