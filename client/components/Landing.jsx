import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import '../style/index.scss';
import '../awesome/scss/font-awesome.scss';

const Landing = () => (
  <div>
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
          <a class="nav-link btn btn-light" href="signin.html">Log in</a>
        </li>
      </ul>
    </div>
  </nav>

  <Switch>
    <Route exact path='/signup' component={SignUp}/>
    <Route path='/login' component={Login}/>
  </Switch>
  
  </div>
 )

export default Landing;