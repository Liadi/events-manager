import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>
        Ooops! page not found
      </h3>
      <h5> Go back <Link to='/dashboard'><button className="btn-link">Home</button></Link></h5>
    </div>
  );
}

export default NotFound;