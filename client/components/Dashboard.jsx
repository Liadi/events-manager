import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeInfoTab, resetAppState, changeDashboardContent } from '../actions/appAction';
import { fetchEvents } from '../actions/eventAction';
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
    this.props.unmountDashboardFunc();
  }

  componentWillMount() {
    (this.props.userType === 'admin')? this.props.changeDashboardContentFunc('recent'):this.props.changeDashboardContentFunc('timeline');
  }

  render() {
    const { dashboardContent, changeDashboardContentFunc, loggedIn, userType, events } = this.props;
    console.log('ev => ', events);
    return (
      <Route render={() => (
        loggedIn ? (
          <div>
            <Navbar userType={userType} />
            <main className="container-fluid d-flex">
              <DashboardSideBar changeDashboardContentFunc={changeDashboardContentFunc} userType={userType}/>
              <div className="mx-auto">
                <div id="tabContentContainer">
                  <TimelineContent show={ dashboardContent === 'timeline' ? true : false } events={events} />
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
  const userType = state.user.accountUser.userType;
  return {
    dashboardContent: state.app.dashboardContent,
    events: state.event.events,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    changeDashboardContentFunc: (newContent) => {
      dispatch(changeDashboardContent(newContent));
      
      if (newContent === 'timeline') {
        const now = new Date(Date.now());
        const farthestFuture = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate());
        console.log('now, farthest Time => ', now, ' ', farthestFuture);
        const timeFrame = JSON.stringify({
          low: now,
          high: farthestFuture,
        });
        const tempParams = {
          limit: 7,
          sort: JSON.stringify({item: 'eventTime', order: 'increasing'}),
          eventTime: timeFrame,
        }
        dispatch(fetchEvents(tempParams));
      }

    },

    unmountDashboardFunc: () => {
      dispatch(resetUserFields());
      dispatch(resetAppState());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
