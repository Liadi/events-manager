import React from 'react';

const ProfileContent = (props) => {
  if (props.show) {
    return (
      <div id="profileContent" className="tab-content">
        <h4>
          Profile
        </h4>
        <form>
          <div className="form-group">
            <label htmlFor="inputFirstName">First Name</label>
            <input type="text" className="form-control" id="inputFirstName" />
          </div>
          
          <div className="form-group">
            <label htmlFor="inputLastName">Last Name</label>
            <input type="text" className="form-control" id="inputLastName" />
          </div>
          
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input type="text" className="form-control" id="inputEmail" />
          </div>
                
          <div className="form-group">
            <label htmlFor="inputLastName">Telephone</label>
            <input type="text" className="form-control" id="inputLastName" />
          </div>
            
          <button type="submit" className="btn">Update</button>
        </form>
      </div>
    );
  }
  return null;
}

export default ProfileContent;