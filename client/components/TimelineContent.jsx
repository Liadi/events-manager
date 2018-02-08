import React from 'react';

const TimelineContent = (props) => {
  if (props.show) {
    return (
      <div id="timelineContent" className="tab-content">
        <h4>
          Timeline
        </h4>
        <div className="tabSection">
          <h5>
            Upcoming Events
          </h5>
          <div>
            You do not have any Upcoming event
          </div>
        </div>
        <div className="tabSection">
          <h5>
            Past Events
          </h5>
          <div>
            No past events  
          </div>
        </div>
      </div>
    );
  }
  return null
}

export default TimelineContent;
