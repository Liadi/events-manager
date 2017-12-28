import React from 'react';
import { Link, Route } from 'react-router-dom';
import '../style/index.scss';
import '../awesome/scss/font-awesome.scss';

const Landing = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-big" >
    <a class="navbar-brand" href="#">EM</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item navbar-item mx-auto">
          <Link class="nav-link" to='/signup'>Sign up</Link>
        </li>
        <li class="navbar-item">
          <Link class="nav-link btn btn-light" to='/login'>Log in</Link>
        </li>
      </ul>
    </div>
  </nav>
 )

export default Landing;