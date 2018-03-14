import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import EventForm from './EventForm.jsx';
import CenterForm  from './CenterForm.jsx';
import AmenitiesList from './AmenitiesList.jsx';
import ModalView from './ModalView.jsx';
import '../style/center-events.scss';
import { validateUser } from '../util';
import { userLogout } from '../actions/userAction';
import { closeModal, closeInfoTab, resetAppState, toggleSlatedEvents, toggleCenterUpdateForm, toggleEventForm, openModal } from '../actions/appAction';
import { fetchCenter, resetCenterFields, resetCenterEntries, deleteCenter } from '../actions/centerAction';

class SingleCenter extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.currentCenter = undefined;
    this.state = {
      showCenterOrEventForm: null,
      showSlatedEvents: false,
      imageIndex: 0,
    };
    this.id = props.match.params.id;
    this.amenitiesInputElement = undefined;
    this.toggleSlatedEvents = this.toggleSlatedEvents.bind(this);
    this.setShowCenterOrEventForm = this.setShowCenterOrEventForm.bind(this);
    this.changeImageIndex = this.changeImageIndex.bind(this);
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
    this.props.fetchCurrentCenterFunc(this.id);
  }

  toggleSlatedEvents(){
    this.setState((prevState, props) => ({
      showSlatedEvents: !prevState.showSlatedEvents,
    }));
  }

  setShowCenterOrEventForm(nextValue) {
    this.setState((prevState, props) => ({
      showCenterOrEventForm: nextValue,
    }));
  }

  changeImageIndex(forward) {
    if (forward) {
      this.setState((prevState, props) => ({
        imageIndex: ((this.currentCenter.images.length + (prevState.imageIndex + 1)) % this.currentCenter.images.length),
      }));
    } else {
      this.setState((prevState, props) => ({
        imageIndex: ((this.currentCenter.images.length + (prevState.imageIndex - 1)) % this.currentCenter.images.length),
      }));
    }
  }

  render() {
    const { centersArray, userType, loggedIn, centerUpdateForm, eventForm, slatedEvents, userLogoutFunc, modalViewMode, modalCallbackFunc, closeModalFunc, modalContent, showModal, initiateDeleteCenterFunc } = this.props;

    for (let i in centersArray){
      if (centersArray[i].id === parseInt(this.id)) {
        this.currentCenter = centersArray[i];
      }
    }

    return (
      <Route render={() => (
        this.currentCenter ? (
          <div>
            {loggedIn?
              (
                <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
              ):(
                null
              )
            }
            
            <main className="container">
              { (loggedIn && userType === 'admin' && this.state.showCenterOrEventForm !== 'center')?
                (
                  <input type='button' className='btn space-right-sm' value='Update Center' onClick= { e => {
                    this.setShowCenterOrEventForm('center');
                  }}/>
                ):(
                  null
                )
              }

              { loggedIn && this.state.showCenterOrEventForm !== 'event'?
                (
                    <input type='button' className='btn' value='Add Event' onClick= { e => {
                      this.setShowCenterOrEventForm('event');
                    }}/>
                ):(
                  null
                )
              }
              
              { this.state.showCenterOrEventForm === 'event'?
                (
                  <EventForm centerId={this.id} closeFormFunc={this.setShowCenterOrEventForm} type='create'/>
                ):(
                  null
                )
              }
              
              {this.state.showCenterOrEventForm === 'center'? (
                <div>
                  <CenterForm type="update" closeFormFunc={this.setShowCenterOrEventForm} centerId={this.currentCenter.id} centerUpdateToggleInput={this.centerUpdateToggleInput} />
                </div>
              ) : (null)}
              
              <div className="card container" id="card-div">
                <div className="card-center row" id="center-descrip">
                    
                  <div className="card-body col-lg-5">
                    <h3 className="card-title">{this.currentCenter.centerName}</h3>
                  
                    <h4 className="card-subtitle mb-2 text-muted space-top">Address</h4>
                    <h5 className="card-text">{this.currentCenter.centerAddress}</h5>
                    
                    <h4 className="card-subtitle mb-2 text-muted space-top">Country</h4>
                    <h5 className="card-text">{this.currentCenter.centerCountry}</h5>
                    
                    <h4 className="card-subtitle mb-2 text-muted space-top">State</h4>
                    <h5 className="card-text">{this.currentCenter.centerState}</h5>
                    
                    <h4 className="card-subtitle mb-2 text-muted space-top">Center Capacity</h4>
                    <h5 className="card-text">{this.currentCenter.centerCapacity}</h5>
                    {loggedIn?
                      (
                        <div>
                          <h4 className="card-subtitle mb-2 text-muted space-top">Rate(per day)</h4>
                          <h5 className="card-text">#{this.currentCenter.centerRate}</h5>
                          <h4 className="card-subtitle mb-2 text-muted space-top">Status</h4>
                          <h5 className="card-text">{this.currentCenter.centerStatus}</h5>
                        </div>
                      ):(
                        null
                      )
                    }
                    { this.currentCenter.centerAmenities && this.currentCenter.centerAmenities.length > 0?
                      (
                        <div>
                          <h4 className="card-subtitle mb-2 text-muted space-top">Amenities</h4>
                          <AmenitiesList center={this.currentCenter}/>
                        </div>
                      ):(
                       null
                      )
                    }
                    
                  </div>
                  
                  <div className="col-lg-7">
                    <div className='mx-auto space-top'>
                      <h5 className="card-title">{this.currentCenter.centerDescription}</h5>
                    </div>

                    { (this.currentCenter.images && this.currentCenter.images.length > 0)?(
                      <figure className='fig-res mx-auto'>
                        <button className='btn btn-link' id='left-arrow' onClick={ e => {
                          e.preventDefault();
                          this.changeImageIndex(false);

                        }}>
                          <i className='fa fa-angle-left fa-3x'></i>
                        </button>
                        
                        <button className='btn btn-link' id='right-arrow' onClick={ e => {
                          e.preventDefault();
                          this.changeImageIndex(true);
                        }}>
                          <i className='fa fa-angle-right fa-3x'></i>
                        </button>

                        <img src={'/images/'+ this.currentCenter.images[this.state.imageIndex].imagePath} alt={this.currentCenter.images[this.state.imageIndex].imageDescription} title={this.currentCenter.images[this.state.imageIndex].imageDescription} className='img-res' />
                      </figure>
                    ):(
                      null
                    )
                    }
                  </div>


                </div>
              </div>
              { loggedIn ?
                (
                  <label className="custom-control custom-checkbox space-top">
                    <input type="checkbox" className="custom-control-input" id="slatedEventsToggle" onChange={ e => {
                      this.toggleSlatedEvents();
                    }}/>
                    <span className="custom-control-indicator"></span>
                    { (this.state.showSlatedEvents)?
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
              {this.state.showSlatedEvents?
                (
                  <div>
                    {
                      (this.currentCenter.events.length > 0) ?
                      (
                        <table className="table table-striped" id="eventTable">
                          <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Event Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.currentCenter.events.map((event, index) =>
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

              { userType === 'admin' ? 
                (
                  <input type='button' className="btn btn-delete grp-btn space-top" value='Delete' onClick={ e => {
                    e.preventDefault();
                    initiateDeleteCenterFunc(this.currentCenter.id);
                  }}/>
                ):(
                  null
                )
              }
            </main>
            
            <ModalView mode={modalViewMode} callback={modalCallbackFunc} closeModalFunc={closeModalFunc} modalContent={modalContent} showModal={showModal}/>
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
    modalContent: state.app.modalContent,
    modalViewMode: state.app.modalMode,
    modalCallBack: state.app.modalCallBack,
    showModal: state.app.showModal,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,

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

    closeModalFunc: () => {
      dispatch(closeModal());
    },

    initiateDeleteCenterFunc: (centerId) => {
      dispatch(openModal('decision', `
      <h4>Are you sure you want to delete this center?</h4>
      <p>***Note all events associated with this center will be deleted</p>
      `, deleteCenter(centerId)));
    },

    resetCenterEntriesFunc: () => {
      dispatch(resetCenterEntries());
    },
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    modalCallbackFunc: () => {
      dispatchProps.dispatch(stateProps.modalCallBack());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SingleCenter)
