import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeInfoTab, closeModal, resetAppState } from '../actions/appAction';
import { userLogout } from '../actions/userAction';
import { updateCenterField, deleteCenterFieldError, centerFieldInputError, resetCenterFields, createCenter } from '../actions/centerAction';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import '../style/create-center.scss';
import { validateUser } from '../util';

const inputFieldSet = new Set();

const AmenitiesList = (props) => {
  const {center} = props;
  if (center['centerAmenities'] && center['centerAmenities'].length > 0) {
    return(
      <div className='outputBox'>
        {center.centerAmenities.map((msg, index) => 
          <div key={index} className='container'>
            <p className="mx-auto col-10">{msg}</p>
          </div>
        )}
      </div>
    );
  }
  return null;
}

class CreateCenter extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.amenitiesInputElement = undefined;
  }

  componentWillUnmount() {
    this.props.resetFunc();
  }

  componentWillMount() {
  }

  render() {
    const { userType, userLogoutFunc, loggedIn, centerFieldError, closeInfoTabFunc, closeModalFunc, updateCenterFieldFunc, center, resetFunc, createCenterFunc } = this.props;
    return (
      <Route render={() => (
        (loggedIn && userType === 'admin')? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            <main className="container mx-auto">
              <h3>Create Center</h3>
              <div className="container mx-auto" id="main-div">
                <form>
                  <div className="form-group">
                    <label htmlFor="inputCenterName"><h6>Name</h6></label>
                    <input type="text" id="inputCenterName" className={
                      (centerFieldError['centerName'] === undefined) ? "form-control" : "form-control field-error"
                    }
                    onChange={ e => {
                      if (e.target.value.length > 30)  {
                        e.target.value = center['centerName'];
                      } else {
                        updateCenterFieldFunc('centerName', e.target.value);
                      }
                      inputFieldSet.add(e.target);
                    }}/>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-2 col-sm-4">
                      <label htmlFor="inputCenterCountry"><h6>Country</h6></label>
                      <input type="text" id="inputCenterCountry" className={
                      (centerFieldError['centerCountry'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                        if (e.target.value.length > 30)  {
                          e.target.value = center['centerCountry'];
                        } else {
                          updateCenterFieldFunc('centerCountry', e.target.value);
                        }
                        inputFieldSet.add(e.target);
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
                        inputFieldSet.add(e.target);
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
                        inputFieldSet.add(e.target);
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
                        inputFieldSet.add(e.target);
                      }}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputCenterCapacity"><h6>Capacity</h6></label>
                    <input type="text" id="centerCapacity" className={
                      (centerFieldError['centerCapacity'] === undefined) ? "form-control" : "form-control field-error"
                    }
                    onChange={ e => {
                      inputFieldSet.add(e.target);
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
                      inputFieldSet.add(e.target);
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
                      inputFieldSet.add(e.target);
                    }}/>
                    <button type='button' onClick={ e => {
                      e.preventDefault();
                      if(this.amenitiesInputElement && this.amenitiesInputElement.value) {
                        let tempPlaceHolder = this.amenitiesInputElement.value
                        this.amenitiesInputElement.value = "";
                        if(!center['centerAmenities']) {
                          updateCenterFieldFunc('centerAmenities', [tempPlaceHolder]);
                        } else {
                          let tempArray = center['centerAmenities'];
                          updateCenterFieldFunc('centerAmenities', center['centerAmenities'].concat(tempPlaceHolder));
                        }
                      }

                    }}> Enter </button>
                    <AmenitiesList center={center} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputCenterDescription"><h6>Short Description</h6></label>
                    <input type="text" id="inputCenterDescription" placeholder="maximum of 50 characters" className={
                      (centerFieldError['centerDescription'] === undefined) ? "form-control" : "form-control field-error"
                    }
                    onChange={ e => {
                      inputFieldSet.add(e.target);
                      if (e.target.value.length <= 50) {
                        updateCenterFieldFunc('centerDescription', e.target.value);
                      } else {
                        e.target.value = center.centerDescription || "";
                      }
                    }}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputCenterMantra"><h6>Mantra</h6></label>
                    <input type="text" id="inputCenterMantra" placeholder="maximum of 30 characters" className={
                      (centerFieldError['centerMantra'] === undefined) ? "form-control" : "form-control field-error"
                    }
                    onChange={ e => {
                      inputFieldSet.add(e.target);
                      if (e.target.value.length <= 30) {
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
                      createCenterFunc(inputFieldSet);
                    }}>Create</button>
                    <button type="reset" className="btn btn-danger grp-btn" onClick={ e => {
                      resetFunc();
                    }}>Clear</button>
                  </div>
                </form>
              </div>
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
    centerFieldError: state.center.error.fieldError,
    center: state.center.center,
  	userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },

    closeModalFunc: () => {
      dispatch(closeModal());
    },
    updateCenterFieldFunc: (field=null, value=null) => {
      dispatch(updateCenterField(field, value));
      let msg;
      switch (field) {
        case 'centerName': {
          if (value === '') {
            msg = 'center name is required';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
        case 'centerCountry': {
          if (value === '') {
            msg = 'center country is required';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
        case 'centerState': {
          if (value === '') {
            msg = 'center state is required';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
        case 'centerCapacity': {
          if (value === '') {
            msg = 'center capacity is required';
            dispatch(centerFieldInputError(field, msg));
          } else if (parseInt(value) < 5) {
            msg = 'center capacity should not be less than five (5)';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
        case 'centerRate': {
          if (value === '') {
            msg = 'center capacity is required';
            dispatch(centerFieldInputError(field, msg));
          } else if (parseInt(value) < 500) {
            msg = 'center rate should not be less than five hundred naira (#500)';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
        case 'centerAddress': {
          if (value === '') {
            msg = 'center address is required';
            dispatch(centerFieldInputError(field, msg));
          } else {
            dispatch(deleteCenterFieldError(field));
          }
          break;
        }
      }
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    resetFunc: () => {
      if (inputFieldSet.size > 0) {
        dispatch(resetCenterFields());
      }
      dispatch(resetAppState());
    },
    createCenterFunc: (inputFieldSetArg) => {
      dispatch(createCenter(inputFieldSetArg));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCenter)
