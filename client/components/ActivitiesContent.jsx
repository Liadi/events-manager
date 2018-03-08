import PageControl from './PageControl.jsx';
import LogListComponent from './LogListComponent.jsx';
import React from 'react';

const ActivitiesContent = (props) => {
  if (props.show) {
    console.log('outer ', props);
    return (
      <div id="timelineContent" className="tab-content">
        <h4>
          So far...
        </h4>
        {props.logs.length > 0?(<div>
          {props.logs.map((log) =>
            <LogListComponent key={log.id} log={log}/>
          )}
        </div>):(<h5>Nothing Yet</h5>) }
        <PageControl page={props.logPage} limit={props.logLimit} changePageFunc={props.changeLogPageFunc} totalElement={props.logTotalElement} />
      </div>
    );
  }
  return null
}

export default ActivitiesContent;
