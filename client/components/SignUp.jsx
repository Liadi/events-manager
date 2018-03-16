import React from 'react';
import '../style/signup.scss';
import { Link, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import NotFound from './NotFound.jsx';
import PageFetching from './PageFetching.jsx';
import ModalView from './ModalView.jsx';
import Navbar from './Navbar.jsx';
import { closeInfoTab, closeModal, resetAppState } from '../actions/appAction';
import { updateUserField, resetUserFields, deleteUserFieldError, updatePasswordConfirmation, fetchUser, userFieldInputError, createUser, userLogout } from '../actions/userAction';
import { validateUser, validateEmail } from '../util';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  render() {
    const { user, passwordConfirmed, userFieldError, updateUserFieldFunc, infoTabMsg, showInfoTab, closeInfoTabFunc, createUserFunc, closeModalFunc, modalContent, showModal, loggedIn, createAdmin, userType, userLogoutFunc, fetchingUser } = this.props;

    if(userType !== 'admin' && loggedIn) {
      return(
        <NotFound />
      )
    }
    if (fetchingUser) {
      return (
        <PageFetching />
      )
    }
    return (
      <Route render={props => (
        (loggedIn && !createAdmin)? (
          <Redirect to={{
            pathname: '/dashboard'
          }}/>
        ) : (
          <div>
            {!createAdmin?(
              <nav className="navbar navbar-light bg-light">
                <Link className="navbar-brand mx-auto" to='/'>
                  <h2>EM</h2>
                </Link>
              </nav>
            ):(
              <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            )}
            {createAdmin?(
              <div className='container'>
                <h3>Create Admin</h3>
                <small>***Note: created admin will have all admin privileges</small>
              </div>
            ):(
              null
            )}
            <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
            <main>
              <div className="card board box mx-auto">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="inputFirstName">First Name</label>
                    <input type="text" value={user.userFirstName || ''} className={
                      (userFieldError['userFirstName'] === undefined) ? "form-control" : "form-control field-error"
                    } 
                    id="inputFirstName" 
                    onChange={ e => {
                        updateUserFieldFunc('userFirstName', e.target.value);
                      }
                    }/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputLastName">Last Name</label>
                    <input type="text" value={user.userLastName || ''} className={
                      (userFieldError['userLastName'] === undefined) ? "form-control" : "form-control field-error"
                    } 
                    id="inputLastName" 
                    onChange={ e => {
                        updateUserFieldFunc('userLastName', e.target.value.trim());
                      }
                    }/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="text" value={user.userEmail || ''} className={
                      (userFieldError['userEmail'] === undefined) ? "form-control" : "form-control field-error"
                    } 
                    id="inputEmail" 
                    onChange={ e => {
                        updateUserFieldFunc('userEmail', e.target.value.trim());
                      }
                    }/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" value={user.userPassword || ''} className={
                      (userFieldError['userPassword'] === undefined || !passwordConfirmed ) ? "form-control" : "form-control field-error"
                    } 
                    id="inputPassword" 
                    onChange={ e => {
                        updateUserFieldFunc('userPassword', e.target.value);
                      }
                    }/>
                  </div>
                          
                  <div className="form-group">
                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                    <input type="password" value={user.userConfirmPassword || ''} className={
                      passwordConfirmed ? "form-control" : "form-control field-error"
                    } 
                    id="inputConfirmPassword"
                    onChange={ e => {
                        updateUserFieldFunc('userConfirmPassword', e.target.value);
                      }
                    }/>
                  </div>
                          
                  <div className="form-group">
                    <button type="button" className="btn" onClick={ e => {
                      e.preventDefault();
                      createUserFunc();
                    }}>
                      {createAdmin?
                        (
                          'Create'
                        ):(
                          'Sign up'
                        )
                      }
                    </button>
                    {!createAdmin?
                      (
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                      ):(
                        null
                      )
                    }
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

const mapStateToProps = (state, ownProps) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
   const userType = state.user.accountUser.userType;
  return {
    fetchingUser: state.user.fetching,
    user: state.user.user,
    userFieldError: state.user.error.fieldError,
    passwordConfirmed: state.user.passwordConfirmed,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    modalContent: state.app.modalContent,
    showModal: state.app.showModal,
    createAdmin: ownProps.createAdmin,
    loggedIn,
    userType,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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
    createUserFunc: () => {
      dispatch(updatePasswordConfirmation());
      dispatch(createUser(ownProps.createAdmin));
    },
    closeModalFunc: () => {
      dispatch(closeModal());
    },
    unmountFunc: () => {
      dispatch(resetUserFields());
      dispatch(resetAppState());
    },
    userLogoutFunc: () => {
      dispatch(userLogout());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
