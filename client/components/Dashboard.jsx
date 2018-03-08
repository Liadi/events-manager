import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeInfoTab, closeModal, resetAppState, changeDashboardContent } from '../actions/appAction';
import { fetchEvents } from '../actions/eventAction';
import { resetUserFields, userLogout, updateUser, updateUserField, deleteUserFieldError, userFieldInputError, updatePasswordConfirmation } from '../actions/userAction';

import { changeLogPage, fetchUserLogs, resetLogFields, restLogEntries } from '../actions/logAction';

import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import TimelineContent from './TimelineContent.jsx';
import HowContent from './HowContent.jsx';
import ProfileContent from './ProfileContent.jsx';
import SecurityContent from './SecurityContent.jsx';
import ActivitiesContent from './ActivitiesContent.jsx';
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
      (this.props.userType === 'admin')?this.props.changeDashboardContentFunc('activities'):this.props.changeDashboardContentFunc('timeline');
    }
  }

  render() {
    const { dashboardContent, changeDashboardContentFunc, loggedIn, userType, events, logs, userLogoutFunc, userFieldError, infoTabMsg, showInfoTab, modalContent, showModal, closeInfoTabFunc, closeModalFunc, updateUserFieldFunc,props, updateUserFunc, passwordConfirmed, user, logPage, logLimit, logTotalElement, changeLogPageFunc } = this.props;
    return (
      <Route render={() => (
        loggedIn ? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            <main className="container-fluid d-flex">
              <DashboardSideBar changeDashboardContentFunc={changeDashboardContentFunc} userType={userType}/>
              <div id="tabContentContainer">
                  <TimelineContent show={ dashboardContent === 'timeline' ? true : false } events={events} />

                  <ActivitiesContent show={ dashboardContent === 'activities' ? true : false } logs={logs} logPage={logPage} logLimit={logLimit} logTotalElement={logTotalElement} changeLogPageFunc={changeLogPageFunc} />
                  
                  <HowContent show={ dashboardContent === 'how' ? true : false } />
                  
                  <ProfileContent show={ dashboardContent === 'profile' ? true : false } userFieldError={userFieldError} infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} modalContent={modalContent} showModal={showModal} updateUserFieldFunc={updateUserFieldFunc} closeInfoTabFunc={closeInfoTabFunc} closeModalFunc={closeModalFunc} updateUserFunc={updateUserFunc} passwordConfirmed={passwordConfirmed} user={user} />
                  
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
    logPage: state.log.page,
    logLimit: state.log.limit,
    logTotalElement: state.log.totalElement,
    userFieldError: state.user.error.fieldError,
    user: state.user.accountUser,
    passwordConfirmed: state.user.passwordConfirmed,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    modalContent: state.app.modalContent,
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
    changeDashboardContentFunc: (newContent) => {
      dispatch(changeDashboardContent(newContent));
      switch (newContent) {
        case 'timeline': {
          const now = new Date(Date.now());
          const farthestFuture = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate());
          const timeFrame = JSON.stringify({
            low: now,
            high: farthestFuture,
          });
          const tempParams = {
            limit: 10,
            sort: JSON.stringify({item: 'eventTime', order: 'INC'}),
            eventTime: timeFrame,
          }
          dispatch(fetchEvents(tempParams));
          break;
        }
        case 'activities': {
          const tempParams = {
            limit: 10,
            sort: JSON.stringify({item: 'createdAt', order: 'DESC'}),
          }
          dispatch(fetchUserLogs(tempParams));
          break;
        }
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
      dispatch(resetLogFields());
      dispatch(restLogEntries());
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    changeLogPageFunc: (page) => {
      dispatch(changeLogPage(page));
      dispatch(fetchUserLogs());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
