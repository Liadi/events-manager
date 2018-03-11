import React from 'react';

import { Link } from 'react-router-dom';

import Footer from './Footer.jsx';

const Navbar = (props) => {
  return (
  	<nav className="navbar navbar-expand-lg navbar-light bg-light p-big" >
      <Link className="navbar-brand" to='/dashboard'>EM</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item navbar-item mx-auto">
            <Link className="nav-link" to='/centers'>Centers</Link>
          </li>
          { props.userType === 'admin' ?
            (
              <ul className="navbar-nav">
                <li className="nav-item navbar-item mx-auto">
                  <Link className="nav-link" to='/create-center'>Create Center</Link>
                </li>
                <li className="nav-item navbar-item mx-auto">
                  <Link className="nav-link" to='/events'>Events</Link>
                </li>
                { props.userType === 'regular'?
                  (
                    <li className="nav-item navbar-item mx-auto">
                      <Link className="nav-link" to="/events">My Events</Link>
                    </li>
                  ):(
                    <li className="nav-item navbar-item mx-auto">
                      <Link className="nav-link" to="create-admin">Add Admin</Link>
                    </li>
                  )
                }
                <li className="nav-item navbar-item mx-auto">
                  <input value='Log out' type='button' className="nav-link btn btn-light" 
                    onClick={ e => {
                      props.userLogoutFunc();
                    }
                  }/>
                </li>
              </ul>
            ):(
              null
            )
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
