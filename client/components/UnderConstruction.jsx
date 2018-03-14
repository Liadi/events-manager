import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';

const UnderConstruction = () => {
  return (
    <div clasName='space-top-2x'>
      <h3 className='display-4 text-center'>
        Page Still in Contruction
      </h3>
      <h5 className='display-4 text-center'> Go back <Link to='/dashboard'>Home</Link></h5>
    </div>
  );
}

export default UnderConstruction;