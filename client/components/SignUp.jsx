import React from 'react';
import '../style/signup.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import { updateUserField, deleteUserFieldError, updatePasswordConfirmation, fetchUser, userFieldInputError, userSignUp } from '../actions/userAction';

let SignUp = ({ userFieldError, updateUserFieldFunc, infoTabMsg, showInfoMsg, userSignUpFunc }) => {
  return (
    <div>
      <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoMsg={showInfoMsg} />
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
              <button type="button" className="btn" onClick={ e => {
                e.preventDefault();
                userSignUpFunc();
              }}>
                Sign up
              </button>
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
    showInfoMsg: state.user.showInfoMsg,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    updateUserFieldFunc: (field = null, value = null) => {
      dispatch(updateUserField(field, value));
      switch (field) {
        case 'userFirstName': {
          if (value) {
            const len = value.length;
            if(len < 2 || len > 30) {
              const msg = 'first name should have 2-30 characters';
              dispatch(userFieldInputError(field, msg));
            } else {
              dispatch(deleteUserFieldError(field));
            }
          } else {
            const msg = 'firstname is required';
            dispatch(userFieldInputError(field, msg));
          }
          break;
        }

        case 'userLastName': {
          if (value) {
            const len = value.length;
            if(len < 2 || len > 30) {
              const msg = 'last name should have 2-30 characters';
              dispatch(userFieldInputError(field, msg));
            } else {
              dispatch(deleteUserFieldError(field));
            }
          } else {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }

        case 'userEmail': {
          if (!validateEmail(value)){
            const msg = 'invalid email';
            dispatch(userFieldInputError(field, msg));
          } else {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }

        case 'userPassword': {
          if (value.length === 0) {
            const msg = 'password required';
            dispatch(userFieldInputError(field, msg));
          } else if (value.length < 6){
            const msg = 'password should have at least 6 characters';
            dispatch(userFieldInputError(field, msg));
          } else {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }

        case 'userConfirmPassword': {
          dispatch(updatePasswordConfirmation());
          break;
        }
      }
    },
    userSignUpFunc: () => {
      dispatch(userSignUp());
    },
  }
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

SignUp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp)

export default SignUp;
