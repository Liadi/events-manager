import React from 'react';
import {Link} from 'react-router-dom';

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
          { (events && events.length > 0)?
            (
              <h4>
                Events
              </h4>
            ):(
              <h4>No events! Check out our <Link className='link' to='/centers'>centers</Link></h4>
            )
          }
          <div className="tabSection">
            <div>
              {events.map((event) => 
                <div className="card mx-auto card-center" key={event.id}>
                  <div className="card-body">
                    <span className={`badge badge-pill ${event.eventStatus==='upcoming'?('badge-warning'):(null)} ${event.eventStatus==='successful'?('badge-secondary'):(null)} ${event.eventStatus==='cancelled'?('badge-danger'):(null)}`}>{event.eventStatus}</span>
                    <h4 className="card-title">{event.eventName}</h4>
                    <h6 className="card-subtitle mb-2">{event.center.centerName}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">{event.center.centerAddress}</h6>
                    <div className="d-flex justify-content-end">
                      <div className="d-flex flex-wrap justify-content-center grp">
                        <Link className="btn btn-primary grp-btn" to={`/events/${event.id}`}>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
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
