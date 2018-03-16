import React from 'react';

const DashboardSideBar = (props) => {
  return (
    <div id="side-bar">
      {(props.userType === 'regular')? (<div>
        <button className="tab-btn" onClick={ e => {
          props.changeDashboardContentFunc('timeline');
        }}>
          <span className="mx-auto">
            <span>
              <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline">Timeline</h3>
          </span>
        </button>
      </div>) : (null)
      }

      {(props.userType === 'admin')? (<div>
        <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('activities')}}>
          <span className="mx-auto">
            <span>
              <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline">Activities</h3>
          </span>
        </button>
      </div>) : (null)
      }

      <div>
        <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('how')}}> 
          <span className="mx-auto">
            <span>
              <i className="fa fa-question fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline">How to</h3>
          </span>
        </button>
      </div>
      
      <div>
        <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('profile')}}>      
          <span className="mx-auto">
            <span>
              <i className="fa fa-user fa-2x" aria-hidden="true"></i>
            </span>
            <h3 className="d-inline">Profile</h3>
          </span>
        </button>
      </div>
      
      {(props.userType === "admin")?
        (
          <div>
            <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('users')}}>      
              <span className="mx-auto">
                <span>
                  <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                </span>
                <h3 className="d-inline">Users Info</h3>
              </span>
            </button>
          </div>
        ):(
          null
        )
      }
    </div>
  );
}

export default DashboardSideBar;