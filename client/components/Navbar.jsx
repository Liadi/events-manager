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
              </ul>
            ):(
              null
            )
          }
          <li className="nav-item navbar-item mx-auto dropdown">
            <div className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fa fa-user fa-1x mx-auto" aria-hidden="true"></i>
            </div>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              { props.userType === 'regular'?
                (
                  <Link className="dropdown-item" to="events">My Events</Link>
                ):(
                  <Link className="dropdown-item" to="create-admin">Add Admin</Link>
                )
              }
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" 
                onClick={ e => {
                  props.userLogoutFunc();
                }
              }>Log out</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
