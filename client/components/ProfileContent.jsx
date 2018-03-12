import React from 'react';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import ModalView from './ModalView.jsx';
import { closeInfoTab, closeModal, openModal } from '../actions/appAction';
import { resetUserFields, updateUser, updateUserField, deleteUserFieldError, userFieldInputError, updatePasswordConfirmation, deleteAccount } from '../actions/userAction';
const updateSet = new Set();
const changeSet = new Set();

class ProfileContent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showEditOrPasswordForm: null,
    };
    this.setShowEditOrPasswordForm = this.setShowEditOrPasswordForm.bind(this);
  }

  componentWillUnmount() {
  }

  componentWillMount() {
  }

  setShowEditOrPasswordForm(nextValue) {
    this.setState((prevState, props) => ({
      showEditOrPasswordForm: nextValue,
    }));
  }

  render() {
    if (this.props.show) {
      const { userFieldError, infoTabMsg, showInfoTab, modalContent, showModal, modalViewMode, closeModalFunc, closeInfoTabFunc, updateUserFieldFunc, updateUserFunc, initiateDeleteAccountFunc, modalCallbackFunc, passwordConfirmed, user } = this.props;
      return (
        <div id="profileContent" className="tab-content">
          <h4>
            Profile
          </h4>
          <div>
            <div className='row space-top'>
              <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>First Name</h5></div>
              <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userFirstName}</div>
            </div>
            <div className='row space-top'>
              <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>Last Name</h5></div>
              <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userLastName  || 'Nill'}</div>
            </div>
            <div className='row space-top'>
              <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>Email</h5></div>
              <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userEmail}</div>
            </div>
            <div className='row space-top'>
              <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>Telephone</h5></div>
              <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userPhoneNumber || 'Nill'}</div>
            </div>
          </div>
          <div className="dropdown-divider"></div>

          { this.state.showEditOrPasswordForm === 'edit'? (null):(
            <button className='btn space-right-sm' onClick={ e => {
              e.preventDefault();
              this.setShowEditOrPasswordForm('edit');
            }}>
              Edit
            </button>
          )}

          { this.state.showEditOrPasswordForm === 'password'? (null):(
            <button className='btn space-right-sm' onClick={ e => {
              e.preventDefault();
              this.setShowEditOrPasswordForm('password');
            }}>
              Change Password
            </button>
          )}

          <button type='button' className="btn btn-delete" onClick={ e => {
            e.preventDefault();
            initiateDeleteAccountFunc();
          }}> Delete Account</button>
          
          <InfoTab className='infoTab space-top' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
          { this.state.showEditOrPasswordForm === 'edit'?
            (
              <div>
                <h4>
                  Edit
                </h4>
                <button className='btn badge badge-warning space-top-sm form-cancel' onClick={ e => {
                  e.preventDefault();
                  this.setShowEditOrPasswordForm(null);
                }}>
                  <i className="fa fa-times"></i>
                </button>
                <form>
                  <div className="form-group">
                    <label htmlFor="inputFirstName">First Name</label>
                    <input type="text"
                      name="inputFirstName" 
                      className={
                        (userFieldError['userFirstName'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        updateUserFieldFunc('userFirstName', e.target.value);
                        updateSet.add(e.target);
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="inputLastName">Last Name</label>
                    <input type="text"
                      name="inputLastName" 
                      className={
                        (userFieldError['userLastName'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        updateUserFieldFunc('userLastName', e.target.value);
                        updateSet.add(e.target);
                      }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="text"
                      name="inputEmail" 
                      className={
                        (userFieldError['userEmail'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        updateUserFieldFunc('userEmail', e.target.value);
                        updateSet.add(e.target);
                      }}
                    />
                  </div>
                        
                  <div className="form-group">
                    <label htmlFor="inputTelephone">Telephone</label>
                    <input type="text"
                      name="inputTelephone" 
                      className={
                        (userFieldError['userPhoneNumber'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        updateUserFieldFunc('userPhoneNumber', e.target.value);
                        updateSet.add(e.target);
                      }} 
                    />
                  </div>
                    
                  <button type="button" className="btn" onClick={ e => {
                    e.preventDefault();
                    updateUserFunc(updateSet, 'others');
                  }}>
                    Update
                  </button>
                </form>
              </div>
            ):(
              null
            )
          }

          { this.state.showEditOrPasswordForm === 'password'?
            (
              <div>
                <h4>
                  Change Password
                </h4>
                <button className='btn badge badge-warning space-top-sm form-cancel' onClick={ e => {
                  e.preventDefault();
                  this.setShowEditOrPasswordForm(null);
                }}>
                  <i className="fa fa-times"></i>
                </button>
                <form>
                  <div className="form-group">
                    <label htmlFor="inputOldPassword">Password</label>
                    <input type="password"
                      name="inputOldPassword" 
                      className={
                        (userFieldError['oldUserPassword'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        updateUserFieldFunc('oldUserPassword', e.target.value);
                        changeSet.add(e.target);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputNewPassword">New Password</label>
                    <input type="password"
                      name="inputNewPassword" 
                      className={
                        (userFieldError['newUserPassword'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        updateUserFieldFunc('newUserPassword', e.target.value);
                        changeSet.add(e.target);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputConfirmPassword">Confirm Password</label>
                    <input type="password"
                      name="inputConfirmPassword" 
                      className={
                        passwordConfirmed ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        updateUserFieldFunc('confirmUserPassword', e.target.value);
                        changeSet.add(e.target);
                      }}
                    />
                  </div>
                  <button type="button" className="btn" onClick={ e => {
                    e.preventDefault();
                    updateUserFunc(changeSet, 'password');
                  }}>
                    Change
                  </button> 
                </form>
              </div>
            ):(
              null
            )
          }
          <ModalView mode={modalViewMode} closeModalFunc={closeModalFunc} callback={modalCallbackFunc} modalContent={modalContent} showModal={showModal}/>
        </div>
      );
    }
    return null;
  }
}


const mapStateToProps = (state) => {
  return {
    userFieldError: state.user.error.fieldError,
    user: state.user.accountUser,
    passwordConfirmed: state.user.passwordConfirmed,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    modalContent: state.app.modalContent,
    modalCallBack: state.app.modalCallBack,
    modalViewMode: state.app.modalMode,
    showModal: state.app.showModal,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    dispatch,

    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },
    
    updateUserFieldFunc: (field, value) => {
      dispatch(updateUserField(field, value));
      switch(field) {
        case 'userFirstName': {
          if (value.length === 1 || value.length > 30) {
            const msg = 'first name should have 2-30 characters';
            dispatch(userFieldInputError(field, msg));
          } else {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }
        case 'userLastName': {
          if (value.length === 1 || value.length > 30) {
            const msg = 'first name should have 2-30 characters';
            dispatch(userFieldInputError(field, msg));
          } else {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }
        case 'userEmail': {
          if (value.length > 0 && !validateEmail(value)){
            const msg = 'invalid email';
            dispatch(userFieldInputError(field, msg));
          } else {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }
        case 'oldUserPassword': {
          if (value.length > 0) {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }

        case 'newUserPassword': {
          if (value.length > 0 && value.length < 6) {
            const msg = 'new password should have at least 6 characters';
            dispatch(userFieldInputError(field, msg));
          } else {
            dispatch(deleteUserFieldError(field));
          }
          break;
        }

        case 'confirmUserPassword': {
          dispatch(updatePasswordConfirmation());
          break;
        }

      }
    },

    closeModalFunc: () => {
      dispatch(closeModal());
    },

    updateUserFunc: (inputFieldSet, type) => {
      dispatch(updateUser(inputFieldSet, type));
      if (type === 'password') {
        dispatch(updatePasswordConfirmation());
      }
    },

    unmountDashboardFunc: () => {
      dispatch(resetUserFields());
    },


    initiateDeleteAccountFunc: () => {
      dispatch(openModal('decision', `
      <h4>Are you sure you want to delete your account?</h4>
      <p>***Note: All your activities will be deleted`, deleteAccount()));
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    modalCallbackFunc: () => {
      dispatchProps.dispatch(stateProps.modalCallBack());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ProfileContent);