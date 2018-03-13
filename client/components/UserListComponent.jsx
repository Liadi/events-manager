import React from 'react';

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  toggleShowDetails 
  render() {
    const { user, redirectToLogsFunc } = this.props;
    return (
      <div className='card mx-auto card-center space-top'>
        <div className="card-body">
          <div className='row space-top-sm'>
            <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>First Name</h5></div>
            <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userFirstName}</div>
          </div>
          <div className='row space-top-sm'>
            <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>Last Name</h5></div>
            <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userLastName  || 'Nill'}</div>
          </div>
          <div className='row space-top-sm'>
            <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>Email</h5></div>
            <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userEmail}</div>
          </div>
          <div className='row space-top-sm'>
            <div className='col-md-3 col-sm-5 col-xs-6 col-12'><h5>Telephone</h5></div>
            <div className='col-md-9 col-sm-7 col-xs-6 col-12'>{user.userPhoneNumber || 'Nill'}</div>
          </div>

          <button className='btn' onClick={ e => {
            e.preventDefault();
            // redirectToLogsFunc(user.id);
          }}>
            User Logs
          </button>
        </div>
      </div>
    )
  }
}

export default UserListComponent;
