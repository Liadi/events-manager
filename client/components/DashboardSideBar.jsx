import React from 'react';

const DashboardSideBar = (props) => {
  return (
    <div id="side-bar">
      <div>
        <button className="tab-btn" id="btnTimeline" onClick={ e => {props.changeDashboardContentFunc('timeline')}}>
          <span className="mx-auto">
            <span>
              <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline" id="timelineTabElem">Timeline</h3>
          </span>
        </button>
      </div>
      <div>
        <button className="tab-btn" id="btnHow" onClick={ e => {props.changeDashboardContentFunc('how')}}> 
          <span className="mx-auto">
            <span>
              <i className="fa fa-question fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline" id="howTabElem">How to</h3>
          </span>
        </button>
      </div>
      <div>
        <button className="tab-btn" id="btnProfile" onClick={ e => {props.changeDashboardContentFunc('profile')}}>      
          <span className="mx-auto">
            <span>
              <i className="fa fa-user fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline" id="profileTabElem">Profile</h3>
          </span>
        </button>
      </div>
      <div>
        <button className="tab-btn" id="btnSecurity" onClick={ e => {props.changeDashboardContentFunc('security')}}>      
          <span className="mx-auto">
            <span>
              <i className="fa fa-lock fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline" id="securityTabElem">Security</h3>
          </span>
        </button>
      </div>
    </div>
  );
}

export default DashboardSideBar;