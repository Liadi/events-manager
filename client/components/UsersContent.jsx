import React from 'react';
import { connect } from 'react-redux';
import PageControl from './PageControl.jsx';
import UserListComponent from './UserListComponent.jsx';
import { changeUserPage, fetchAllUsers, resetUserFields, resetUserEntries, updateUserField } from '../actions/userAction';
import { redirectToLogs } from '../actions/logAction';

class UsersContent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showSearch: false,
    };
    this.toggleShowSearch = this.toggleShowSearch.bind(this);
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
    this.props.mountFunc();
  }

  toggleShowSearch () {
    this.setState((prevState, props) => ({
      showSearch: !prevState.showSearch,
    }));
  }

  render() {
    const { show, currentUserId, userField, users, userPage, userLimit, changeUserPageFunc, userTotalElement, updateUserFieldFunc, fetchAllUsersFunc, resetSearchFieldFunc, redirectToLogsFunc } = this.props;
    if (show) {
      return (
        <div id="timelineContent" className="tab-content">
          <h4>
            Placeholder
          </h4>
          <button className='btn' onClick={ e => {
            e.preventDefault();
            if (this.state.showSearch){
              resetSearchFieldFunc();
            }
            this.toggleShowSearch();
          }}>Advanced Search</button>
          { this.state.showSearch?
            (
              <form className='container'>
                <div className='row space-top'>
                  <div className="col-sm-3 space-bottom-sm space-right-sm">
                    <label htmlFor='userFirstNameControl'>FirstName</label>
                    <input type='text' value={userField.userFirstName || ''} id='userFirstNameControl' className='form-control form-control-sm' onChange={ e => {
                      e.preventDefault();
                      updateUserFieldFunc('userFirstName', e.target.value)
                    }}/>
                  </div>

                  <div className="col-sm-3 space-bottom-sm space-right-sm">
                    <label htmlFor='userLastNameControl'>LastName</label>
                    <input type='text' value={userField.userLastName || ''} id='userLastNameControl' className='form-control form-control-sm' onChange={ e => {
                      e.preventDefault();
                      updateUserFieldFunc('userLastName', e.target.value)
                    }}/>
                  </div>

                  <div className="col-sm-3 space-bottom-sm space-right-sm">
                    <label htmlFor='userEmailControl'>Email</label>
                    <input type='text' value={userField.userEmail || ''} id='userEmailControl' className='form-control form-control-sm' onChange={ e => {
                      e.preventDefault();
                      updateUserFieldFunc('userEmail', e.target.value)
                    }}/>
                  </div>

                  <div className="col-sm-3 space-bottom-sm space-right-sm">
                    <label htmlFor='userTypeControl'>Type</label>
                    <select value={userField.userType || 'All'} id='userTypeControl' className="form-control form-control-sm" onChange={ e => {
                      if (e.target.value === 'All'){
                        updateUserFieldFunc('userType', null);
                      } else {
                        updateUserFieldFunc('userType', e.target.value);
                      }
                      changeUserPageFunc(1);
                      fetchAllUsersFunc();
                    }}>
                      <option>All</option>
                      <option>regular</option>
                      <option>admin</option>
                    </select>
                  </div>
                </div>
                <div className='d-flex flex-row space-top'>
                  <button className='btn space-right-sm' type='submit' onClick={ e => {
                    e.preventDefault();
                    changeUserPageFunc(1);
                    fetchAllUsersFunc();
                  }}>
                    Search
                  </button>
                  <button className='btn btn-danger' type='reset' onClick={ e => {
                    e.preventDefault();
                    resetSearchFieldFunc();
                  }}>
                    Reset
                  </button>
                </div>
              </form>
            ):(
              null
            )}
          {users.length > 0?(<div>
            {users.map((user) =>
              <UserListComponent key={user.id} user={user} redirectToLogsFunc={redirectToLogsFunc}/>
            )}
          </div>):(<h4>No user found. If you find this strange reset search fields and set page index to 1</h4>) }
          <PageControl page={userPage} limit={userLimit} changePageFunc={changeUserPageFunc} totalElement={userTotalElement} />
        </div>
      );
    }
    return null;
  }
}


const mapStateToProps = (state) => {
  return {
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    currentUserId: state.user.accountUser.userId,
    users: state.user.users,
    userField: state.user.user,
    userPage: state.user.page,
    userLimit: state.user.limit,
    userTotalElement: state.user.totalElement,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUsersFieldFunc: (field, value) => {
      dispatch(updateUserField(field, value));
    },

    unmountFunc: () => {
      dispatch(resetUserFields());
      dispatch(resetUserEntries());
    },

    fetchAllUsersFunc: () => {
      dispatch(fetchAllUsers());
    },

    mountFunc: () => {
      dispatch(changeUserPage(1));
      dispatch(fetchAllUsers());
    },

    changeUserPageFunc: (page) => {
      dispatch(changeUserPage(page));
      dispatch(fetchAllUsers());
    },

    updateUserFieldFunc: (field, value) => {
      dispatch(updateUserField(field, value));
    },

    redirectToLogsFunc: (userId, userFirstName) => {
      dispatch(redirectToLogs(userId, userFirstName));

    },

    resetSearchFieldFunc: () => {
      dispatch(updateUserField('userType', null));
      dispatch(updateUserField('userFirstName', ''));
      dispatch(updateUserField('userLastName', ''));
      dispatch(changeUserPage(1));
      dispatch(fetchAllUsers());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContent);
