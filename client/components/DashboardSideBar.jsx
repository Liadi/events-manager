import React from 'react';

const DashboardSideBar = (props) => {
  return (
    <div id='side-bar' className='col-md-3 mx-auto space-top'>
      <div className="row mx-auto">
        {(props.userType === 'regular')? (<div className={props.userType === "admin"?("col-3 col-md-12 mx-auto"):("col-4 col-md-12 mx-auto")}>
          <button className="tab-btn" onClick={ e => {
            props.changeDashboardContentFunc('timeline');
          }}>
            <span className="d-flex justify-content-around flex-row flex-wrap">
              <span>
                <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
              </span>
              <h3 className="tab-btn-descrip">Timeline</h3>
            </span>
          </button>
        </div>) : (null)
        }

        {(props.userType === 'admin')? (<div className={props.userType === "admin"?("col-3 col-md-12 mx-auto"):("col-4 col-md-12 mx-auto")}>
          <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('activities')}}>
            <span className="d-flex justify-content-around flex-row flex-wrap">
              <span>
                <i className="fa fa-calendar-o fa-2x" aria-hidden="true"></i>
              </span>
              <h3 className="tab-btn-descrip">Activities</h3>
            </span>
          </button>
        </div>) : (null)
        }

        <div className={props.userType === "admin"?("col-3 col-md-12 mx-auto"):("col-4 col-md-12 mx-auto")}>
          <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('how')}}> 
            <span className="d-flex justify-content-around flex-row flex-wrap">
              <span>
                <i className="fa fa-question fa-2x" aria-hidden="true"></i>
              </span>
              <h3 className="tab-btn-descrip">How</h3>
            </span>
          </button>
        </div>
        
        <div className={props.userType === "admin"?("col-3 col-md-12 mx-auto"):("col-4 col-md-12 mx-auto")}>
          <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('profile')}}>      
            <span className="d-flex justify-content-around flex-row flex-wrap">
              <span>
                <i className="fa fa-cog fa-2x" aria-hidden="true"></i>
              </span>
              <h3 className="tab-btn-descrip">Profile</h3>
            </span>
          </button>
        </div>
        
        {(props.userType === "admin")?
          (
            <div className={props.userType === "admin"?("col-3 col-md-12 mx-auto"):("col-4 col-md-12 mx-auto")}>
              <button className="tab-btn" onClick={ e => {props.changeDashboardContentFunc('users')}}>      
                <span className="d-flex justify-content-around flex-row flex-wrap">
                  <span>
                    <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                  </span>
                  <h3 className="tab-btn-descrip">Users</h3>
                </span>
              </button>
            </div>
          ):(
            null
          )
        }
      </div>
    </div>
  );
}

export default DashboardSideBar;