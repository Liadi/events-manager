import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import InfoTab from './InfoTab.jsx';
import '../style/center-events.scss';
import { validateUser, validateEmail } from '../util';
import { userLogout } from '../actions/userAction';
import { closeModal, closeInfoTab, resetAppState, toggleSlatedEvents, toggleCenterUpdateForm } from '../actions/appAction';
import { fetchCenter, resetCenterFields, updateCenterField, updateCenter, centerFieldInputError, deleteCenterFieldError } from '../actions/centerAction';

const inputFieldSet = new Set();

const AmenitiesList = (props) => {
  const {center} = props;
  let tempArray = [];
  if (center['centerAmenities']) {
    tempArray = JSON.parse(center['centerAmenities']);
  }
  if ( tempArray && tempArray.length > 0) {
    return(
      <div className='outputBox'>
        {tempArray.map((entry, index) =>
          <p className="card-text" key={index}>{entry}</p>
        )}
      </div>
    );
  }
  return null;
}

class SingleCenter extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.id = props.match.params.id;
    this.amenitiesInputElement = undefined;
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
  }

  render() {
    const { center, centersArray, userType, loggedIn, centerFieldError, centerUpdateForm, slatedEvents, closeModalFunc, userLogoutFunc, updateCenterFieldFunc, updateCenterFunc, fetchCurrentCenterFunc, toggleCenterUpdateFormFunc, toggleSlatedEventsFunc, infoTabMsg, showInfoTab, closeInfoTabFunc, resetFunc } = this.props;
    let currentCenter;
    
    for (let i in centersArray){
      if (centersArray[i].id === parseInt(this.id)) {
        currentCenter = centersArray[i];
      }
    }
    if (!currentCenter) {
      fetchCurrentCenterFunc(this.id);
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
              
              { userType === 'admin'?
                (<label className="custom-control custom-checkbox d-block">
                  <input type="checkbox" className="custom-control-input" id="updateFormToggle" onChange={ e => {
                    toggleCenterUpdateFormFunc();
                    inputFieldSet.add(e.target);
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
                  <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
                  <form>
                    <div className="form-group">
                      <label htmlFor="inputCenterName"><h6>Name</h6></label>
                      <input type="text" id="inputCenterName" className={
                        (centerFieldError['centerName'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        if (e.target.value.length > 30) {
                          e.target.value = center['centerName'];
                        } else {
                          updateCenterFieldFunc('centerName', e.target.value);
                        }
                      }}/>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-2 col-sm-4">
                        <label htmlFor="inputCenterCountry"><h6>Country</h6></label>
                        <input type="text" id="inputCenterCountry" className={
                          (centerFieldError['centerCountry'] === undefined) ? "form-control" : "form-control field-error"
                        }
                        onChange={ e => {
                          if (e.target.value.length > 30) {
                            e.target.value = center['centerCountry'];
                          } else {
                            updateCenterFieldFunc('centerCountry', e.target.value);
                          }
                        }}/>
                      </div>
                      <div className="form-group col-md-2 col-sm-4">
                        <label htmlFor="inputCenterState"><h6>State</h6></label>
                        <input type="text" id="inputCenterState" className={
                        (centerFieldError['centerState'] === undefined) ? "form-control" : "form-control field-error"
                        }
                        onChange={ e => {
                          if (e.target.value.length > 30)  {
                            e.target.value = center['centerState'];
                          } else {
                            updateCenterFieldFunc('centerState', e.target.value);
                          }
                        }}/>
                      </div>
                      <div className="form-group col-md-2 col-sm-4">
                        <label htmlFor="inputCenterCity"><h6>City</h6></label>
                        <input type="text" id="inputCenterCity" className={
                        (centerFieldError['centerCity'] === undefined) ? "form-control" : "form-control field-error"
                        }
                        onChange={ e => {
                          if (e.target.value.length > 30)  {
                            e.target.value = center['centerCity'];
                          } else {
                            updateCenterFieldFunc('centerCity', e.target.value);
                          }
                        }}/>
                      </div>
                      <div className="form-group d-block col-md-6 ">
                        <label htmlFor="inputCenterAddress"><h6>Full address</h6></label>
                        <input type="text" id="inputCenterAddress" className={
                        (centerFieldError['centerAddress'] === undefined) ? "form-control" : "form-control field-error"
                        }
                        onChange={ e => {
                          if (e.target.value.length > 120)  {
                            e.target.value = center['centerAddress'];
                          } else {
                            updateCenterFieldFunc('centerAddress', e.target.value);
                          }
                        }}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputCenterCapacity"><h6>Capacity</h6></label>
                      <input type="text" id="centerCapacity" className={
                        (centerFieldError['centerCapacity'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        if (String(parseInt(e.target.value)) === e.target.value && parseInt(e.target.value) <= 1000000000) {
                          updateCenterFieldFunc('centerCapacity', e.target.value);
                        } else {
                          // enter number in range [5, 1000000000(1 billion)]
                          if (e.target.value === "") {
                            updateCenterFieldFunc('centerCapacity', '');
                          } else {
                            e.target.value = center.centerCapacity || "";
                          }
                        }
                      }}/>
                    </div>        
                    <div className="form-group">
                      <label htmlFor="inputCenterRate"><h6>Rate</h6></label>
                      <input type="text" id="inputCenterRate" placeholder="per hour" className={
                        (centerFieldError['centerRate'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        if (String(parseInt(e.target.value)) === e.target.value && parseInt(e.target.value) <= 1000000000) {
                            updateCenterFieldFunc('centerRate', e.target.value);
                        } else {
                          // enter number in range [500, 1000000000(1 billion)]
                          if (e.target.value === "") {
                            updateCenterFieldFunc('centerRate', '');
                          } else {
                            e.target.value = center.centerRate || "";
                          }
                        }
                      }}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputCenterAmenities"><h6>Amenities</h6></label>
                      <input type="text" id="inputCenterAmenities" placeholder="e.g standby generator, toilets, air-conditioned..." className={
                        (centerFieldError['centerAmenities'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        this.amenitiesInputElement = e.target;
                        if (e.target.value.length > 50) {
                          e.target.value = e.target.value.slice(0, 50);
                        } 
                      }}/>
                      <button type='button' onClick={ e => {
                        e.preventDefault();
                        if(this.amenitiesInputElement && this.amenitiesInputElement.value) {
                          let tempPlaceHolder = this.amenitiesInputElement.value
                          this.amenitiesInputElement.value = "";
                          if(!center['centerAmenities']) {
                            updateCenterFieldFunc('centerAmenities', JSON.stringify([tempPlaceHolder]));
                          } else {
                            let tempArray = JSON.parse(center['centerAmenities']);
                            updateCenterFieldFunc('centerAmenities', JSON.stringify(JSON.parse(center['centerAmenities']).concat(tempPlaceHolder)));
                          }
                        }

                      }}> Enter </button>
                      <AmenitiesList center={center} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputCenterDescription"><h6>Short Description</h6></label>
                      <input type="text" id="inputCenterDescription" placeholder="maximum of 120 characters" className={
                        (centerFieldError['centerDescription'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        if (e.target.value.length <= 120) {
                          updateCenterFieldFunc('centerDescription', e.target.value);
                        } else {
                          e.target.value = center.centerDescription || "";
                        }
                      }}/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputCenterMantra"><h6>Mantra</h6></label>
                      <input type="text" id="inputCenterMantra" placeholder="maximum of 50 characters" className={
                        (centerFieldError['centerMantra'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        if (e.target.value.length <= 50) {
                          updateCenterFieldFunc('centerMantra', e.target.value);
                        } else {
                          e.target.value = center.centerMantra || "";
                        }
                      }}/>
                    </div>

                    <div className="form-group">
                      <input type="file" name="pic" accept="image/*" id="imgFile"/>
                      <button type="button" className="btn btn-warning grp-btn">Upload</button>
                    </div>
                    <div className="d-flex flex-wrap" id="imagesContainer"> </div>
                    <div className="d-flex  justify-content-end grp form-group">
                      <button type="button" className="btn btn-warning grp-btn" onClick={ e => {
                        e.preventDefault();
                        updateCenterFunc(parseInt(currentCenter.id, 10));
                      }}>Update</button>
                      <button type="reset" className="btn btn-danger grp-btn" onClick={ e => {
                        resetFunc();
                      }}>Clear</button>
                    </div>
                  </form>
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
    centerFieldError: state.center.error.fieldError,
    centerUpdateForm: state.app.centerUpdateForm,
    slatedEvents: state.app.slatedEvents,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    updateCenterFieldFunc: (field=null, value=null) => {
      dispatch(updateCenterField(field, value));
      let msg;
      switch (field) {
        case 'centerCapacity': {
          if (value !== "" && parseInt(value) < 5) {
            msg = 'center capacity should not be less than five (5)';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
        case 'centerRate': {
          if (value !== '' && parseInt(value) < 500) {
            msg = 'center rate should not be less than five hundred naira (#500)';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
      }
    },

    updateCenterFunc: (centerId) => {
      dispatch(updateCenter(inputFieldSet, centerId));
    },

    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },

    closeModalFunc: () => {
      dispatch(closeModal());
    },

    unmountFunc: () => {
      dispatch(resetCenterFields());
      dispatch(resetAppState());
    },

    fetchCurrentCenterFunc: (id) => {
      dispatch(fetchCenter(id));
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    resetFunc: () => {
      if (inputFieldSet.size > 0) {
        dispatch(resetCenterFields(inputFieldSet));
      }
      dispatch(resetAppState());
    },

    toggleSlatedEventsFunc: () => {
      dispatch(toggleSlatedEvents());
    },

    toggleCenterUpdateFormFunc: () => {
      dispatch(toggleCenterUpdateForm());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCenter)
