import React from 'react';
import { Switch , Route, Link } from 'react-router-dom';
import Landing from './Landing.jsx';
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import CreateCenter from './CreateCenter.jsx';

const App = () => {
	return (
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/login' component={Login}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/create-center' component={CreateCenter}/>
    </Switch>
	)
}

export default App;