import React from 'react';
import { connect } from 'react-redux';
import { changeDashboardContent } from '../actions/appAction';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import TimelineContent from './TimelineContent.jsx';
import HowContent from './HowContent.jsx';
import ProfileContent from './ProfileContent.jsx';
import SecurityContent from './SecurityContent.jsx';
import DashboardSideBar from './DashboardSideBar.jsx';
import '../style/dashboard.scss';

let Dashboard = ({ dashboardContent, changeDashboardContentFunc }) => {
  return (
    <div>
      <Navbar />
      <main className="container-fluid d-flex">
        <DashboardSideBar changeDashboardContentFunc={changeDashboardContentFunc}/>
        <div className="mx-auto">
          <div id="tabContentContainer">
            <TimelineContent show={ dashboardContent === 'timeline'  ?  true : false } />
            <HowContent show={ dashboardContent === 'how'  ?  true : false } />
            <ProfileContent show={ dashboardContent === 'profile'  ?  true : false } />
            <SecurityContent show={ dashboardContent === 'security'  ?  true : false } />
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dashboardContent: state.app.dashboardContent,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    changeDashboardContentFunc: (newContent) => {
      dispatch(changeDashboardContent(newContent));
    },
  }
}

Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)


export default Dashboard;