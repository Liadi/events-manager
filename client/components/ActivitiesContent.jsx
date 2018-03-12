import React from 'react';
import { connect } from 'react-redux';
import PageControl from './PageControl.jsx';
import LogListComponent from './LogListComponent.jsx';
import { changeLogPage, fetchUserLogs, resetLogFields, restLogEntries } from '../actions/logAction';

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
    const { show, logs, logPage, logLimit, changeLogPageFunc, logTotalElement } = this.props;
    if (show) {
      return (
        <div id="timelineContent" className="tab-content">
          <h4>
            Activities So far
          </h4>
          <button className='btn' onClick={ e =>{
            e.preventDefault();
            this.toggleShowSettings();
          }}>Settings</button>
          { this.state.showSettings?
            (
              <form>
                <select>
                  <option>My logs</option>
                  <option>All logs</option>
                </select>
                <input />
                <button className='btn space-right-sm'>Submit</button>
                <button type='reset' className='btn btn-danger'>Reset</button>
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
    logs: state.log.logs,
    log: state.log.log,
    logPage: state.log.page,
    logLimit: state.log.limit,
    logTotalElement: state.log.totalElement,
    
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    mountFunc: () => {
      dispatch(fetchUserLogs());
    },

    unmountFunc: () => {
      dispatch(resetLogFields());
      dispatch(restLogEntries());
    },

    changeLogPageFunc: (page) => {
      dispatch(changeLogPage(page));
      dispatch(fetchUserLogs());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesContent);
