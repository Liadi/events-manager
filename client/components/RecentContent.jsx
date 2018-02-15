import React from 'react';

const RecentContent = (props) => {
  if (props.show) {
    return (
      <div id="timelineContent" className="tab-content">
        <h4>
          Your Recent Activities
        </h4>
        <div>
          {props.logs.map((log) => 
            <div key={log.id} className='container'>
              <p className="mx-auto col-9">{log.action} id is => {log.id}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null
}

export default RecentContent;
