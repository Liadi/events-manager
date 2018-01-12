import React from 'react';
import '../style/signup.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import { updateUserField, updatePasswordConfirmation, fetchUser, userFieldInputError } from '../actions/userAction';

let SignUp = ({ userFieldError, updateUserFieldFunc, infoTabMsg }) => {
  return (
    <div>
      <InfoTab infoTabMsg={ infoTabMsg } />
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand mx-auto" to='/'>
          <h2>EM</h2>
        </Link> 
      </nav>
      <main>
        <div className="card board box mx-auto">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="inputFirstName">First Name</label>
              <input type="text" className="form-control" id="inputFirstName" onChange={ e => {
                  updateUserFieldFunc('userFirstName', e.target.value);
                }
              }/>
            </div>
            <div className="form-group">
              <label htmlFor="inputLastName">Last Name</label>
              <input type="text" className="form-control" id="inputLastName" onChange={ e => {
                  updateUserFieldFunc('userLastName', e.target.value);
                }
              }/>
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={ e => {
                  updateUserFieldFunc('userEmail', e.target.value);
                }
              }/>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control" id="inputPassword" onChange={ e => {
                  updateUserFieldFunc('userPassword', e.target.value);
                }
              }/>
            </div>
                    
            <div className="form-group">
              <label htmlFor="inputConfirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="inputConfirmPassword" onChange={ e => {
                  updateUserFieldFunc('userConfirmPassword', e.target.value);
                }
              }/>
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

const mapStateToProps = (state) => {
  return {
    userFieldError: state.user.error.fieldError,
    infoTabMsg: state.user.infoTabMsg,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    updateUserFieldFunc: (field = null, value = null) => {
      switch (field) {
        case 'userEmail': {
          if (!validateEmail(value)){
            const msg = 'invalid email';
            dispatch(userFieldInputError(field, msg));
          }
          else {
            dispatch(updateUserField(field, value));
          }
          break;
        }
        case 'userPassword': {
          if (value.length < 6){
            const msg = 'password should have at least 6 characters';
            dispatch(userFieldInputError(field, msg));
          } else {
            dispatch(updateUserField(field, value));
          }
          break;
        }
        case 'userConfirmPassword': {
          if (value.length  >= 6){
            dispatch(updateUserField(field, value));
            dispatch(updatePasswordConfirmation());
          }
          break;
        }
      }
    },
  }
}

SignUp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp)

export default SignUp;

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}