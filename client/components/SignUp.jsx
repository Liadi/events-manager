import React from 'react';
import '../style/signup.scss';
import { Link, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import ModalView from './ModalView.jsx';
import { closeInfoTab, closeModal, resetAppState } from '../actions/appAction';
import { updateUserField, resetUserFields, deleteUserFieldError, updatePasswordConfirmation, fetchUser, userFieldInputError, userSignUp } from '../actions/userAction';
import { validateUser } from '../util';

const inputFieldSet = new Set();

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  render() {
    const { passwordConfirmed, userFieldError, updateUserFieldFunc, infoTabMsg, showInfoTab, closeInfoTabFunc, userSignUpFunc, closeModalFunc, modalContent, showModal, loggedIn } = this.props;
    return (
      <Route render={props => (
        loggedIn ? (
          <Redirect to={{
            pathname: '/dashboard'
          }}/>
        ) : (
          <div>
            <nav className="navbar navbar-light bg-light">
              <Link className="navbar-brand mx-auto" to='/'>
                <h2>EM</h2>
              </Link>
            </nav>
            <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
            <main>
              <div className="card board box mx-auto">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="inputFirstName">First Name</label>
                    <input type="text" className={
                      (userFieldError['userFirstName'] === undefined) ? "form-control" : "form-control field-error"
                    } 
                    id="inputFirstName" 
                    onChange={ e => {
                        updateUserFieldFunc('userFirstName', e.target.value);
                        inputFieldSet.add(e.target);
                      }
                    }/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputLastName">Last Name</label>
                    <input type="text" className={
                      (userFieldError['userLastName'] === undefined) ? "form-control" : "form-control field-error"
                    } 
                    id="inputLastName" 
                    onChange={ e => {
                        updateUserFieldFunc('userLastName', e.target.value.trim());
                        inputFieldSet.add(e.target);
                      }
                    }/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="text" className={
                      (userFieldError['userEmail'] === undefined) ? "form-control" : "form-control field-error"
                    } 
                    id="inputEmail" 
                    onChange={ e => {
                        updateUserFieldFunc('userEmail', e.target.value.trim());
                        inputFieldSet.add(e.target);
                      }
                    }/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className={
                      (userFieldError['userPassword'] === undefined || !passwordConfirmed ) ? "form-control" : "form-control field-error"
                    } 
                    id="inputPassword" 
                    onChange={ e => {
                        updateUserFieldFunc('userPassword', e.target.value);
                        inputFieldSet.add(e.target);
                      }
                    }/>
                  </div>
                          
                  <div className="form-group">
                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                    <input type="password" className={
                      passwordConfirmed ? "form-control" : "form-control field-error"
                    } 
                    id="inputConfirmPassword"
                    onChange={ e => {
                        updateUserFieldFunc('userConfirmPassword', e.target.value);
                        inputFieldSet.add(e.target);
                      }
                    }/>
                  </div>
                          
                  <div className="form-group">
                    <button type="button" className="btn" onClick={ e => {
                      e.preventDefault();
                      userSignUpFunc(inputFieldSet);
                    }}>
                      Sign up
                    </button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                  </div>
                </form>
              </div>
              </div>
            </main>
            <ModalView closeModalFunc={closeModalFunc} modalContent={modalContent} showModal={showModal}/>
          </div>
        )

      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  return {
    userFieldError: state.user.error.fieldError,
    passwordConfirmed: state.user.passwordConfirmed,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    modalContent: state.app.modalContent,
    showModal: state.app.showModal,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },
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
            console.log('invalid');
            dispatch(userFieldInputError(field, msg));
          } else {
            console.log('valid');
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
    userSignUpFunc: (inputFieldSetArg) => {
      dispatch(updatePasswordConfirmation());
      dispatch(userSignUp(inputFieldSetArg));
    },
    closeModalFunc: () => {
      dispatch(closeModal());
    },
    unmountFunc: () => {
      dispatch(resetUserFields());
      dispatch(resetAppState());
    },
  }
}

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
