import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';

const NotFound = (props) => {
  if (props.fetching) {
    return (<p>loading</p>)

  }

  return (
    <div className='space-top'>
      <h1 className='display-4 text-center'>404</h1>
      <h3 className='display-4 text-center'>
        Ooops! page not found
      </h3>
      <h5 className='display-4 text-center'> Go back <Link to='/dashboard'>Home</Link></h5>
    </div>
  );
}

export default NotFound;