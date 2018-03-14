import React from 'react';
import { connect } from 'react-redux';
import PageControl from './PageControl.jsx';
import LogListComponent from './LogListComponent.jsx';
import { changeLogPage, fetchUserLogs, resetLogFields, resetLogEntries, updateLogField } from '../actions/logAction';

class ActivitiesContent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      showSettings: false,
    };
    this.toggleShowSettings = this.toggleShowSettings.bind(this);
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
    this.props.mountFunc();
  }

  toggleShowSettings () {
    this.setState((prevState, props) => ({
      showSettings: !prevState.showSettings,
    }));
  }

  render() {
    const { show, currentUserId, logField, logs, logPage, logLimit, changeLogPageFunc, logTotalElement, updateLogFieldFunc, resetFunc } = this.props;
    if (show) {
      return (
        <div id="timelineContent" className="tab-content">
          { (logField.userId === currentUserId)?(
            <h4>
              Your Activities
            </h4>  
          ):(
            null
          )}

          { (logField.userId && logField.userId !== currentUserId)?(
            <div className='alert alert-info'>
              <button className='btn badge badge-warning' onClick={resetFunc}>
                <i className="fa fa-times"></i>
              </button>
              <h4>
                {`${logField.userFirstName}'s Activities`}
              </h4>
            </div>
          ):(
            null
          )}

          { (!logField.userId)?(
            <h4>All user activities</h4>
          ):(
            null
          )}

          <button className='btn' onClick={ e =>{
            e.preventDefault();
            this.toggleShowSettings();
          }}>Settings</button>
          { this.state.showSettings?
            (
              <form className='container'>
                <div className='row'>
                  <label htmlFor='myLogsCheck' className="custom-control custom-checkbox col-sm-3 space-top-sm">
                    <input type="checkbox" checked={logField.userId === currentUserId? (true):(false) } className="custom-control-input" id="myLogsCheck" onChange={ e => {
                      if (logField.userId === currentUserId){
                        updateLogFieldFunc('userId', null);
                      } else {
                        updateLogFieldFunc('userId', currentUserId);
                      }
                    }}/>
                    <span className="custom-control-indicator"></span>
                    <span className="custom-control-description">My logs</span>
                  </label>
                </div>                

                <div className='row space-top'>
                  <div className="col-sm-3 space-bottom-sm space-right-sm">
                    <label htmlFor='logEntityControl'>Entity</label>
                    <select value={logField.entity || 'All'} id='logEntityControl' className="form-control form-control-sm" onChange={ e => {
                      if (e.target.value === 'All'){
                        updateLogFieldFunc('entity', null);
                      } else {
                        updateLogFieldFunc('entity', e.target.value);
                      }
                    }}>
                      <option>All</option>
                      <option>Center</option>
                      <option>Event</option>
                      <option>User</option>
                    </select>
                  </div>

                  <div className="col-sm-3 space-bottom-sm space-right-sm">
                    <label htmlFor='logActionControl'>Action</label>
                    <select value={logField.action || 'All'} id='logActionControl' className="form-control form-control-sm" onChange={e => {
                      if (e.target.value === 'All'){
                        updateLogFieldFunc('action', null);
                      } else {
                        updateLogFieldFunc('action', e.target.value);
                      }
                    }}>
                      <option>All</option>
                      <option>POST</option>
                      <option>UPDATE</option>
                      <option>DELETE</option>
                    </select>
                  </div>
                </div>
              </form>
            ):(
              null
            )}
          {logs.length > 0?(<div>
            {logs.map((log) =>
              <LogListComponent key={log.id} log={log}/>
            )}
          </div>):(<h5>Nothing Yet</h5>) }
          <PageControl page={logPage} limit={logLimit} changePageFunc={changeLogPageFunc} totalElement={logTotalElement} />
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
    logs: state.log.logs,
    logField: state.log.log,
    logPage: state.log.page,
    logLimit: state.log.limit,
    logTotalElement: state.log.totalElement,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,

    updateLogFieldFunc: (field, value) => {
      dispatch(updateLogField(field, value));
      dispatch(changeLogPage(1));
      dispatch(fetchUserLogs());
    },

    unmountFunc: () => {
      dispatch(resetLogFields());
      dispatch(resetLogEntries());
    },

    changeLogPageFunc: (page) => {
      dispatch(changeLogPage(page));
      dispatch(fetchUserLogs());
    },
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    
    mountFunc: () => {
      dispatchProps.dispatch(updateLogField('userId', stateProps.currentUserId));
      dispatchProps.dispatch(changeLogPage(1));
      dispatchProps.dispatch(fetchUserLogs());
    },

    resetFunc: () => {
      dispatchProps.dispatch(resetLogFields());
      dispatchProps.dispatch(resetLogEntries());
      dispatchProps.dispatch(changeLogPage(1));
      dispatchProps.dispatch(updateLogField('userId', stateProps.currentUserId));
      dispatchProps.dispatch(fetchUserLogs());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ActivitiesContent);
