import React from 'react';
import '../style/signup.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const SignUp = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand mx-auto" href="./index.html">
          <Link className="navbar-brand" to='/'>
            <h2>EM</h2>
          </Link> 
        </a>
      </nav>
      <main>
        <div className="card board box mx-auto">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="inputEmail">First Name</label>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">Last Name</label>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Password</label>
              <input type="password" className="form-control" id="confirmPassword" />
            </div>
                    
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" />
            </div>
                    
            <div className="form-group">
              <button type="button" className="btn">Sign up</button>
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;