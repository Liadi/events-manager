import React from 'react';

class TimelineContent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    // this.props.mountTimelineFunc();
  }

  render() {
    const { show, events } = this.props;
    if (show) {
      return (
        <div id="timelineContent" className="tab-content">
          <h4>
            Timeline
          </h4>
          <div className="tabSection">
            <h5>
              Events
            </h5>
            <div>
              {events.map((event) => 
                <div key={event.id} className='container'>
                  <p className="mx-auto col-9">{event.eventName}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null
  }
}

export default TimelineContent;
