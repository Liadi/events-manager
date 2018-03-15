import React from 'react';
import { Switch , Route, Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Landing from './Landing.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import CenterForm from './CenterForm.jsx';
import Centers from './Centers.jsx';
import SingleCenter from './SingleCenter.jsx';
import Events from './Events.jsx';
import SingleEvent from './SingleEvent.jsx';
import CreateAdminUser from './CreateAdminUser.jsx';
import UnderConstruction from './UnderConstruction.jsx';
import NotFound from './NotFound.jsx';
import history from '../history';

import ListFetching from './ListFetching.jsx';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route exact path='/create-center' component={CenterForm}/>
        <Route exact path='/centers' component={Centers}/>
        <Route exact path='/centers/:id' component={SingleCenter}/>
        <Route exact path='/events' component={Events}/>
        <Route exact path='/events/:id' component={SingleEvent}/>
        <Route exact path='/create-admin' component={CreateAdminUser}/>
        <Route exact path='/under-construction' component={UnderConstruction}/>

        <Route exact path='/testing' component={ListFetching}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  )
}

export default App;