import React from 'react';

const Logo = ({ onRouteChange }) => {
  return (
    <h1 onClick={() => onRouteChange('signin')} className='ma4 white'>Animated Logo. Click On Me! (this is temporary)</h1>
  );
}

export default Logo;