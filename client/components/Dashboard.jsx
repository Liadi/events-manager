import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeInfoTab, closeModal, resetAppState, changeDashboardContent, openModal } from '../actions/appAction';
import { fetchEvents } from '../actions/eventAction';
import { resetUserFields, userLogout, updateUser, updateUserField, deleteUserFieldError, userFieldInputError, updatePasswordConfirmation, deleteAccount } from '../actions/userAction';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import TimelineContent from './TimelineContent.jsx';
import HowContent from './HowContent.jsx';
import ProfileContent from './ProfileContent.jsx';
import SecurityContent from './SecurityContent.jsx';
import ActivitiesContent from './ActivitiesContent.jsx';
import UsersContent from './UsersContent.jsx';
import DashboardSideBar from './DashboardSideBar.jsx';
import '../style/dashboard.scss';
import { validateUser, validateEmail } from '../util';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    this.props.unmountDashboardFunc();
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.userType === 'admin'? 
      (
        this.props.changeDashboardContentFunc('activities')
      ):(
        this.props.changeDashboardContentFunc('timeline')
      );
    }
  }

  render() {
    const { dashboardContent, changeDashboardContentFunc, loggedIn, userType, events, logs, userLogoutFunc, userFieldError, infoTabMsg, showInfoTab, modalContent, showModal, modalViewMode, closeInfoTabFunc, closeModalFunc, updateUserFieldFunc,props, updateUserFunc, passwordConfirmed, user, logPage, logLimit, logTotalElement, changeLogPageFunc, initiateDeleteAccountFunc, modalCallbackFunc } = this.props;
    return (
      <Route render={() => (
        loggedIn ? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            <main className="container-fluid d-flex">
              <DashboardSideBar changeDashboardContentFunc={changeDashboardContentFunc} userType={userType}/>
              <div id="tabContentContainer" className='col-lg-6 col-md-8 mx-auto'>
                <TimelineContent show={ dashboardContent === 'timeline' ? true : false } events={events} />

                <ActivitiesContent show={ dashboardContent === 'activities' ? true : false } />
                
                <UsersContent show={ dashboardContent === 'users' ? true : false } />

                <HowContent show={ dashboardContent === 'how' ? true : false } />
                
                <ProfileContent show={ dashboardContent === 'profile' ? true : false } />
                
                <SecurityContent show={ dashboardContent === 'security' ? true : false } updateUserFieldFunc={updateUserFieldFunc} />
              </div>
            </main>

            <Footer />
          </div>
        ) : (
          <Redirect to={{
            pathname: '/'
          }}/>
        )

      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  const userType = state.user.accountUser.userType;
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
    dashboardContent: state.app.dashboardContent,
    events: state.event.events,
    logs: state.log.logs,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    dispatch,

    changeDashboardContentFunc: (newContent) => {
      dispatch(changeDashboardContent(newContent));
      if (newContent === 'timeline') {
        const tempParams = {
          limit: 10,
          sort: JSON.stringify({item: 'eventTime', order: 'INC'}),
        }
        dispatch(fetchEvents(tempParams));
      }
    },

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
      dispatch(resetAppState());
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
)(Dashboard)
