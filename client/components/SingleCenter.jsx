import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import EventForm from './EventForm.jsx';
import CenterForm  from './CenterForm.jsx';
import AmenitiesList from './AmenitiesList.jsx';
import '../style/center-events.scss';
import { validateUser } from '../util';
import { userLogout } from '../actions/userAction';
import { closeModal, closeInfoTab, resetAppState, toggleSlatedEvents, toggleCenterUpdateForm, toggleEventForm } from '../actions/appAction';
import { fetchCenter, resetCenterFields, resetCenterEntries } from '../actions/centerAction';

class SingleCenter extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.id = props.match.params.id;
    this.amenitiesInputElement = undefined;
    this.centerUpdateToggleInput = undefined;
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
    this.props.fetchCurrentCenterFunc(this.id);
  }

  render() {
    const { centersArray, userType, loggedIn, centerUpdateForm, eventForm, slatedEvents, userLogoutFunc, toggleCenterUpdateFormFunc, toggleEventFormFunc, toggleSlatedEventsFunc } = this.props;

    let currentCenter;

    for (let i in centersArray){
      if (centersArray[i].id === parseInt(this.id)) {
        currentCenter = centersArray[i];
      }
    }

    return (
      <Route render={() => (
        currentCenter ? (
          <div>
            {loggedIn?
              (
                <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
              ):(
                null
              )
            }
            <main className="container">
              { loggedIn ?
                (
                  <label className="custom-control custom-checkbox d-block">
                    <input type="checkbox" className="custom-control-input" id="slatedEventsToggle" onChange={ e => {
                      toggleSlatedEventsFunc();
                    }}/>
                    <span className="custom-control-indicator"></span>
                    { (slatedEvents)?
                      (
                        <span className="custom-control-description">Hide slated events</span>
                      ):(
                        <span className="custom-control-description">Show slated events</span>
                      )
                    }
                  </label>
                ):(
                  null
                )
              }
              
              { (loggedIn && userType === 'admin')?
                (<label className="custom-control custom-checkbox d-block">
                  <input type="checkbox" className="custom-control-input" id="updateFormToggle" onChange={ e => {
                    this.centerUpdateToggleInput = e.target;
                    toggleCenterUpdateFormFunc();
                  }}/>
                  <span className="custom-control-indicator"></span>
                  { centerUpdateForm?
                    (
                      <span className="custom-control-description">Close Update Form</span>
                    ):
                    (
                      <span className="custom-control-description">Update Center</span>
                    )
                  }
                </label>): (null)
              }

              { loggedIn?
                (
                    <input type='button' className='btn' value={ eventForm? ('Close Form'):('Add Event')} onClick= { e => {
                      toggleEventFormFunc()
                    }}/>
                ):(
                  null
                )
              }
              { eventForm?
                (
                  <EventForm centerId={this.id} type='create'/>
                ):(
                  null
                )
              }
              
              
              <div className="card" id="card-div">
                <div className="card-center d-flex flex-wrap flex-row-reverse justify-content-center" id="center-descrip">
                  <div id="centerImage" className="carousel slide mx-auto col-md-6 caro-div" data-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src="../images/pic3.jpg" alt="Los Angeles" className="img-fluid rounded float-left"/>
                        <div className="carousel-caption">
                          <h3>Front View</h3>
                          <p>Grandeur</p>
                        </div>   
                      </div>
                      <div className="carousel-item">
                        <img src="../images/pic2.jpg" alt="Chicago" className="img-fluid rounded float-left"/>
                        <div className="carousel-caption">
                          <h3>Lodge View</h3>
                          <p>Classy</p>
                        </div>   
                      </div>
                      <div className="carousel-item">
                        <img src="../images/pic7.jpg" alt="New York" className="img-fluid rounded float-left"/>
                        <div className="carousel-caption">
                          <h3>Hall Entrance</h3>
                          <p>Scenic</p>
                        </div>   
                      </div>
                    </div>
                    <a className="carousel-control-prev" href="#centerImage" data-slide="prev">
                      <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#centerImage" data-slide="next">
                      <span className="carousel-control-next-icon"></span>
                    </a>
                  </div>
                  <div className="card-body">
                    <h4 className="card-title">{currentCenter.centerName}</h4>
                    <h5 className="card-title">{currentCenter.centerDescription}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Center address</h6>
                    <p className="card-text">{currentCenter.centerAddress}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Country</h6>
                    <p className="card-text">{currentCenter.centerCountry}</p>
                    <h6 className="card-subtitle mb-2 text-muted">State</h6>
                    <p className="card-text">{currentCenter.centerState}</p>
                    <h6 className="card-subtitle mb-2 text-muted">Center Capacity</h6>
                    <p className="card-text">{currentCenter.centerCapacity}</p>
                    {loggedIn?
                      (
                        <div>
                          <h6 className="card-subtitle mb-2 text-muted">Rate per hour</h6>
                          <p className="card-text">#{currentCenter.centerRate}</p>
                          <h6 className="card-subtitle mb-2 text-muted">Status</h6>
                          <p className="card-text">{currentCenter.centerStatus}</p>
                        </div>
                      ):(
                        null
                      )
                    }
                    <h6 className="card-subtitle mb-2 text-muted">Amenities</h6>
                    <AmenitiesList center={currentCenter}/>
                  </div>
                </div>
              </div>
              {
                slatedEvents?
                (
                  <div>
                    {
                      (currentCenter.events.length > 0) ?
                      (
                        <table className="table table-striped" id="eventTable">
                          <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Event Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentCenter.events.map((event, index) =>
                              <tr key={event.id}>
                                <th scope="row">{parseInt(index, 10) + 1}</th>
                                <td>{new Date(event.eventTime).toDateString()}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      ):(
                        <h4>No Events</h4>
                      )
                    }
                  </div>
                )
                :
                (null)
              }

              {centerUpdateForm ? (
                <div>
                  <CenterForm type="update" centerId={currentCenter.id} centerUpdateToggleInput={this.centerUpdateToggleInput} />
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
  return {
    center: state.center.center,
    centersArray: state.center.centers,
    centerUpdateForm: state.app.centerUpdateForm,
    eventForm: state.app.eventForm,
    slatedEvents: state.app.slatedEvents,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unmountFunc: () => {
      dispatch(resetAppState());
      dispatch(resetCenterEntries());
      dispatch(resetCenterFields());
      
    },

    fetchCurrentCenterFunc: (id) => {
      dispatch(fetchCenter(id));
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    toggleSlatedEventsFunc: () => {
      dispatch(toggleSlatedEvents());
    },

    toggleCenterUpdateFormFunc: () => {
      dispatch(toggleCenterUpdateForm());
    },

    toggleEventFormFunc: () => {
      dispatch(toggleEventForm());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCenter)
