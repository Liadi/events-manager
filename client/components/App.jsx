import React from 'react';
import { Switch , Route, Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Landing from './Landing.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import CreateCenter from './CreateCenter.jsx';
import Centers from './Centers.jsx';
import SingleCenter from './SingleCenter.jsx';
import NotFound from './NotFound.jsx';
import history from '../history';

const App = () => {
	return (
		<Router history={history}>
	    <Switch>
	    	<Route exact path='/' component={Landing}/>
      	<Route exact path='/signup' component={SignUp}/>
      	<Route exact path='/login' component={Login}/>
      	<Route exact path='/dashboard' component={Dashboard}/>
				<Route exact path='/create-center' component={CreateCenter}/>
				<Route exact path='/centers' component={Centers}/>
				<Route exact path='/centers/:id' component={SingleCenter}/>
	      <Route path="*" component={NotFound}/>
	    </Switch>
	  </Router>
	)
}

export default App;