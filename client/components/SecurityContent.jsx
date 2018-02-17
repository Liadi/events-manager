import React from 'react';
import { Link } from 'react-router-dom';

const SecurityContent = (props) => {
  if (props.show) {
    return (
      <div id="securityContent" className="tab-content">
        <h4>
          Security
        </h4>
        <form>
          <h6>Reset password</h6>
          <div className="form-group">
            <label htmlFor="inputOldPassword">Old Password</label>
            <input type="password" className="form-control" id="inputOldPassword" />
          </div>
          <div className="form-group">
            <label htmlFor="inputNewPassword">New Password</label>
            <input type="password" className="form-control" id="inputNewPassword" />
          </div>
          <div className="form-group">
            <label htmlFor="inputConfirmNewPassword">Confirm Password</label>
            <input type="password" className="form-control" id="inputConfirmNewPassword" />
          </div>
          <button type="submit" className="btn">Change</button>
        </form>
        <p className="tabSection"><Link to='/report'>Report</Link> security issues</p>
      </div>
    );
  }
  return null;
}

export default SecurityContent;