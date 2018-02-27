import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetAppState } from '../actions/appAction';
import { userLogout } from '../actions/userAction';
import { updateEventField, deleteEventFieldError, eventFieldInputError, resetEventFields, changeEventPage, fetchEvents, resetEventEntries } from '../actions/eventAction';
import EventSearch from './EventSearch.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import PageControl from './PageControl.jsx';
import '../style/events.scss';
import { validateUser } from '../util';

const inputFieldSet = new Set();

class Events extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
    this.props.resetEventEntriesFunc();
  }

  componentWillMount() {
    this.props.fetchAllEventsFunc();
  }

  render() {
    const { userType, userLogoutFunc, loggedIn, eventFieldError, updateEventFieldFunc, allEvents, resetFunc, page, limit, changeEventPageFunc, totalElement, accountUserId } = this.props;
    return (
      <Route render={() => (
        (loggedIn)? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            <main className="container">
              { userType === 'admin'? 
                (
                  <h3>Events</h3>
                ):(
                  <h3>My Events</h3>
                )
              }
              
              { (allEvents.length > 0)?
                (
                  allEvents.map((event) => 
                    <div className="card mx-auto card-center" key={event.id}>
                      <div className="card-body">
                        <span className="badge badge-pill badge-warning">{event.eventStatus}</span>
                        <h4 className="card-title">{event.eventName}</h4>
                        <h6 className="card-subtitle mb-2">{event.center.centerName}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">{event.center.centerAddress}</h6>
                        <div className="d-flex justify-content-end">
                          <div className="d-flex flex-wrap justify-content-center grp">
                            <Link className="btn btn-primary grp-btn" to={`/events/${event.id}`}>
                              View
                            </Link>
                            { parseInt(event.userId, 10) === parseInt(accountUserId, 10) ? 
                              (
                                <input type='button' className="btn btn-delete grp-btn" value='Delete' onClick={ e => {
                                  e.preventDefault();
                                }}/>
                              ):(
                                null
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                )
                ):(
                 <h3>No event found</h3>
                )
              }
              <PageControl page={page} limit={limit} changePageFunc={changeEventPageFunc} totalElement={totalElement} />
            </main>
            <Footer />
          </div>
        ) : <NotFound />
      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  const userType = state.user.accountUser.userType;
  return {
    accountUserId: state.user.accountUser.userId,
    eventFieldError: state.event.error.fieldError,
    event: state.event.event,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    allEvents: state.event.events,
    totalElement: state.event.totalElement,
    limit: state.event.limit,
    page: state.event.page,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },

    closeModalFunc: () => {
      dispatch(closeModal());
    },

    fetchAllEventsFunc: () => {
      dispatch(fetchEvents());
    },

    updateCenterFieldFunc: (field=null, value=null) => {
      dispatch(updateEventField(field, value));
    },

    changeEventPageFunc: (page) => {
      dispatch(changeEventPage(page));
      dispatch(fetchEvents());
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    resetFunc: () => {
      if (inputFieldSet.size > 0) {
        dispatch(resetEventFields());
      }
      dispatch(resetAppState());
    },

    resetCenterEntriesFunc: () => {
      dispatch(resetEventEntries());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)
