import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import EventForm  from './EventForm.jsx';
import '../style/center-events.scss';
import { validateUser } from '../util';
import { userLogout } from '../actions/userAction';
import { closeModal, closeInfoTab, resetAppState, toggleEventForm } from '../actions/appAction';
import { fetchEvent } from '../actions/eventAction';

class SingleEvent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.id = props.match.params.id;
    this.accountUserId = props.accountUserId;
    this.eventUpdateToggleInput = undefined;
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
  	if (this.props.loggedIn && parseInt(this.id, 10)) {
  		this.props.fetchCurrentEventFunc(this.id);
  	}
  }

  render() {
    if (!this.props.loggedIn) {
      return(<NotFound />);
    }

    const { eventsArray, userType, userLogoutFunc, toggleEventUpdateFormFunc, eventUpdateForm } = this.props;

    let currentEvent;

    for (let i in eventsArray){
      if (eventsArray[i].id === parseInt(this.id)) {
        currentEvent = eventsArray[i];
      }
    }
    return (
      <Route render={() => (
        (currentEvent && (currentEvent.userId ===  this.accountUserId || userType === 'admin')) ? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />

            <main className="container">
              { (currentEvent.userId ===  this.accountUserId)?
                (<label className="custom-control custom-checkbox d-block">
                  <input type="checkbox" className="custom-control-input" id="updateFormToggle" onChange={ e => {
                    this.eventUpdateToggleInput = e.target;
                    toggleEventUpdateFormFunc();
                  }}/>
                  <span className="custom-control-indicator"></span>
                  { eventUpdateForm?
                    (
                      <span className="custom-control-description">Close Update Form</span>
                    ):
                    (
                      <span className="custom-control-description">Update Event</span>
                    )
                  }
                </label>): (null)
              }
              
              <div className="card" id="card-div">
                <div className="card-center d-flex flex-wrap flex-row-reverse justify-content-center" id="center-descrip">
                  <div className="card-body">
                    <h4 className="card-title">{currentEvent.eventName}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                    <p className="card-text">{currentEvent.eventStatus}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Amount Paid</h6>
                    <p className="card-text">{currentEvent.eventAmountPaid}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Time of Event</h6>
                    <p className="card-text">{new Date(currentEvent.eventTime).toDateString()}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Center</h6>
                    <p className="card-text">Name: {currentEvent.center.centerName}</p>
                    <p className="card-text">Address: {currentEvent.center.centerAddress}</p> 
                  </div>
                </div>
              </div>

              {eventUpdateForm ? (
                <div>
                  <EventForm centerId={currentEvent.centerId} eventId={currentEvent.id} eventUpdateToggleInput={this.eventUpdateToggleInput} type='update' currentEventTime = {currentEvent.eventTime}/>
                </div>
              ) : (null)}
            </main>
            <Footer />
          </div>
        ) : (
          <NotFound />
        )
      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  const userType = state.user.accountUser.userType;
  const accountUserId = state.user.accountUser.userId;
  return {
    eventsArray: state.event.events,
    eventUpdateForm: state.app.eventForm,
    accountUserId,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unmountFunc: () => {
      dispatch(resetAppState());
    },

    fetchCurrentEventFunc: (id) => {
      dispatch(fetchEvent(id));
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    toggleEventUpdateFormFunc: () => {
      dispatch(toggleEventForm());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEvent)
