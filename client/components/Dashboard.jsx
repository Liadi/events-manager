import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeInfoTab, resetAppState, changeDashboardContent } from '../actions/appAction';
import { resetUserFields } from '../actions/userAction';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import TimelineContent from './TimelineContent.jsx';
import HowContent from './HowContent.jsx';
import ProfileContent from './ProfileContent.jsx';
import SecurityContent from './SecurityContent.jsx';
import RecentContent from './RecentContent.jsx';
import RecordsContent from './RecordsContent.jsx';
import DashboardSideBar from './DashboardSideBar.jsx';
import '../style/dashboard.scss';
import { validateUser } from '../util';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
    (this.props.userType === 'admin')? this.props.changeDashboardContentFunc('recent'):this.props.changeDashboardContentFunc('timeline');
  }

  render() {
    const { dashboardContent, changeDashboardContentFunc, loggedIn, userType } = this.props;
    return (
      <Route render={() => (
        loggedIn ? (
          <div>
            <Navbar userType={userType} />
            <main className="container-fluid d-flex">
              <DashboardSideBar changeDashboardContentFunc={changeDashboardContentFunc} userType={userType}/>
              <div className="mx-auto">
                <div id="tabContentContainer">
                  <TimelineContent show={ dashboardContent === 'timeline' ? true : false } />
                  <RecentContent show={ dashboardContent === 'recent' ? true : false } />
                  <RecordsContent show={ dashboardContent === 'records' ? true : false } />
                  <HowContent show={ dashboardContent === 'how' ? true : false } />
                  <ProfileContent show={ dashboardContent === 'profile' ? true : false } />
                  <SecurityContent show={ dashboardContent === 'security' ? true : false } />
                </div>
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
  const userType = state.user.accountUser.userType || 'admin';
  return {
    dashboardContent: state.app.dashboardContent,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    changeDashboardContentFunc: (newContent) => {
      dispatch(changeDashboardContent(newContent));
    },
    unmountFunc: () => {
      dispatch(resetUserFields());
      dispatch(resetAppState());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
