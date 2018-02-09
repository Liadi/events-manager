import React from 'react';

const RecentContent = (props) => {
  if (props.show) {
    return (
      <div id="timelineContent" className="tab-content">
        <h4>
          Your Recent Activities
        </h4>
        <div>
        </div>
      </div>
    );
  }
  return null
}

export default RecentContent;
