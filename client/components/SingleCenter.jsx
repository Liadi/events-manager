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
    const { centersArray, userType, loggedIn, centerUpdateForm, eventForm, slatedEvents, userLogoutFunc, toggleCenterUpdateFormFunc, toggleEventFormFunc, toggleSlatedEventsFunc, modalViewMode, modalCallbackFunc, closeModalFunc, modalContent, showModal, initiateDeleteCenterFunc } = this.props;

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
              
              
              <div className="card container" id="card-div">
                <div className="card-center row" id="center-descrip">
                    
                  <div className="card-body col-lg-6">
                    <h3 className="card-title">{currentCenter.centerName}</h3>
                  
                    <h4 className="card-subtitle mb-2 text-muted space-top">Address</h4>
                    <h5 className="card-text">{currentCenter.centerAddress}</h5>
                    
                    <h4 className="card-subtitle mb-2 text-muted space-top">Country</h4>
                    <h5 className="card-text">{currentCenter.centerCountry}</h5>
                    
                    <h4 className="card-subtitle mb-2 text-muted space-top">State</h4>
                    <h5 className="card-text">{currentCenter.centerState}</h5>
                    
                    <h4 className="card-subtitle mb-2 text-muted space-top">Center Capacity</h4>
                    <h5 className="card-text">{currentCenter.centerCapacity}</h5>
                    {loggedIn?
                      (
                        <div>
                          <h4 className="card-subtitle mb-2 text-muted space-top">Rate(per day)</h4>
                          <h5 className="card-text">#{currentCenter.centerRate}</h5>
                          <h4 className="card-subtitle mb-2 text-muted space-top">Status</h4>
                          <h5 className="card-text">{currentCenter.centerStatus}</h5>
                        </div>
                      ):(
                        null
                      )
                    }
                    <h4 className="card-subtitle mb-2 text-muted space-top">Amenities</h4>
                    <AmenitiesList center={currentCenter}/>
                  </div>
                  
                  <div className="col-lg-6">
                    <div className='mx-auto space-top'>
                      <h5 className="card-title">{currentCenter.centerDescription}</h5>
                    </div>

                    <div className='d-flex flex-row flex-wrap justify-content-around space-top'>
                      {
                        currentCenter.images.map((image, index) => {
                          let path = '/images/'+ image.imagePath;
                          return (
                            <figure className='fig-res'>
                              <img key={image.id} src={path} title={image.imageDescription} alt={image.imageDescription} className='img-res' />
                            </figure>
                            
                          )
                        })
                      }
                    </div>
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

              { userType === 'admin' ? 
                (
                  <input type='button' className="btn btn-delete grp-btn" value='Delete' onClick={ e => {
                    e.preventDefault();
                    initiateDeleteCenterFunc(currentCenter.id);
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
