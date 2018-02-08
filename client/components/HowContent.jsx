import React from 'react';

const HowContent = (props) => {
  if (props.show) {
    return (
      <div id="howContent" className="tab-content">
        <h4>
          How to
        </h4>
        <div>
          <div className="tabSection">
            <h5>Create event</h5>
            <ol>
              <li>Click the "user" icon on the top-left corner</li>
              <li>Select "Create Event"</li>
              <li>Fill in the details of the event</li>
              <li>Press the add button to create event</li>
            </ol>
          </div>

          <div className="tabSection">
            <h5>Manage events</h5>
            <ol>
              <li>Click the "user" icon on the top-left corner</li>
              <li>Select "My Events"</li>
            </ol>
          </div>

          <div className="tabSection">
            <h5>View all centers</h5>
            <ol>
              <li>Click "Centers" on the top (navigation) bar</li>
              <li>Click "Advanced Search" for directed search</li>
            </ol>
          </div>

          <div className="tabSection">
            <h5>View details and slated events of a center</h5>
            <ol>
              <li>Click "Centers" on the top (navigation) bar</li>
              <li>Click "Advanced Search" for directed search</li>
              <li>Click the center</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default HowContent;