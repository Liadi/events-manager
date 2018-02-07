import React from 'react';
import jwt from 'jsonwebtoken';
import '../style/signin.scss';
import { Link, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import { closeInfoTab } from '../actions/appAction';
import { updateUserField, deleteUserFieldError, userLogin } from '../actions/userAction';

const inputFieldSet = new Set();

const validateUser = (token, userId) => {
  const [ decoded, currentTime, tempUserId ] = [ jwt.decode(token), (Date.now().valueOf() / 1000), parseInt(userId) ];
  if (!tempUserId || !token) {
    return false;
  }
  if ( tempUserId === decoded.userId && decoded.exp >= currentTime ) {
    return true;
  }
  return false;
}

let LogIn = ({ infoTabMsg, showInfoTab, closeInfoTabFunc, userFieldError, updateUserFieldFunc, userLoginFunc, loggedIn }) => (
  <Route render={props => (
    loggedIn ? (
      <Redirect to={{
        pathname: '/dashboard'
      }}/>
    ) : (
      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand mx-auto" href="./index.html">
            <h2>EM</h2>
          </a>
        </nav>
        <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
        <main>
          <div className="card board box mx-auto">
            <div className="card-body">
              <form>
                <div className="form-group board-element">
                  <label htmlFor="inputEmail">Email address</label>
                  <input type="text" id="inputEmail" onChange={ e => {
                      updateUserFieldFunc('userEmail', e.target.value.trim());
                      inputFieldSet.add(e.target);
                    }
                  }
                  className={
                    (userFieldError.get('userEmail') === undefined) ? "form-control" : "form-control field-error"
                  }
                  />
                </div>
                <div className="form-group board-element">
                  <label htmlFor="confirmPassword">Password</label>
                  <input type="password" id="confirmPassword" onChange={ e => {
                      updateUserFieldFunc('userPassword', e.target.value.trim());
                      inputFieldSet.add(e.target);
                    }
                  }
                  className={
                    (userFieldError.get('userPassword') === undefined) ? "form-control" : "form-control field-error"
                  }
                  />
                </div>
                <div className="form-group board-element" id="lower-form-group">
                  <button type="button" className="board-btn btn" onClick={ e => {
                      userLoginFunc(inputFieldSet);
                    }
                  }>Log in</button>
                  <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>    
              </form>
            </div>
          </div>
        </main>
      </div>
    )

  )}/>
)

const mapStateToProps = (state) => {
  let [token, userId] = [state.user.userToken, state.user.accountUser.userId];
  return {
    userFieldError: state.user.error.fieldError,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    loggedIn: validateUser(token, userId),
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },
    updateUserFieldFunc: (field, value) => {
      dispatch(updateUserField(field, value));
      if (value) {
        dispatch(deleteUserFieldError(field));
      }
    },
    userLoginFunc: (inputFieldSetArg) => {
      dispatch(userLogin(inputFieldSetArg));
    },
  }
}

LogIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogIn);

export default LogIn;
