

import React from 'react';

const CircleIcon = ({ number }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '25px', height: '25px', borderRadius: '50%', backgroundColor: '#007bff', color: 'white', fontSize: '16px' }}>
    {number}
  </div>
);

export default CircleIcon;
