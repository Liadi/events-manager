import React from 'react';
import AmenitiesList from './AmenitiesList.jsx';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeInfoTab, closeModal, resetAppState } from '../actions/appAction';
import { userLogout } from '../actions/userAction';
import { updateCenterField, deleteCenterFieldError, centerFieldInputError, resetCenterFields, createCenter, updateCenter } from '../actions/centerAction';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import NotFound from './NotFound.jsx';
import InfoTab from './InfoTab.jsx';
import '../style/create-center.scss';
import { validateUser } from '../util';

class CenterForm extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.amenitiesInputElement = undefined;
    this.imgArray = [];
    this.srcArray = [];
    this.handleFiles = this.handleFiles.bind(this);
  }

  componentWillUnmount() {
    this.props.resetFunc();
  }

  handleFiles(files){
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')){ continue }
      const src = window.URL.createObjectURL(file);
      
      let img = document.createElement('img')
      img.src = src;
      this.srcArray.push(src);
      console.log('source type', typeof(src));
      img.title = file.name;
      img.order = this.imgArray.length;
      img.classList.add('img-thumbnail');
      img.classList.add('center-img');
      img.file = file
      img.setAttribute('alt', 'Something went wrong');
      

      const figure = document.createElement('figure')
      const figcaption= document.createElement('figcaption')
      figcaption.innerHTML = img.order + 1;

      figure.appendChild(img)
      figure.appendChild(figcaption)
      
      this.imageContainer.appendChild(figure)

      this.imgArray.push(file);
    }
  }

  render() {
    const { userType, userLogoutFunc, type, loggedIn, centerId, centerFieldError, closeInfoTabFunc, closeModalFunc, updateCenterFieldFunc, updateCenterFunc, center, resetFunc, createCenterFunc, showInfoTab, infoTabMsg } = this.props;
    return (
      <Route render={() => (
        (loggedIn && userType === 'admin' || type==="update")? (
          <div>
            {(type === "update")?(null):(<Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            )}
            <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
            
            <main className="container">
              {(type === "update")?(null):(<h3>Create Center</h3>)}
              <div className="row" id={(type === "update")?(null):("")}>
                <form className="card row col-sm-9 col-lg-7 mx-auto">

                  { this.props.closeFormFunc?
                    (
                      <button className='btn badge badge-warning space-top-sm form-cancel' onClick={ e => {
                        e.preventDefault();
                        this.props.closeFormFunc(null);
                      }}>
                        <i className="fa fa-times"></i>
                      </button>
                    ):(
                      null
                    )
                  }
                  
                  <div className='container-fluid'>
                    <div className='row'>

                      <div className="space-top col-md-8 col-lg-9">
                        <label htmlFor="inputCenterName"><h6>Name</h6></label>
                        <input type="text" value={center.centerName || ''} id="inputCenterName" className={
                          (centerFieldError['centerName'] === undefined) ? "form-control" : "form-control field-error"
                        }
                        onChange={ e => {
                          if (e.target.value.length > 30)  {
                            e.target.value = center['centerName'];
                          } else {
                            updateCenterFieldFunc('centerName', e.target.value);
                          }
                        }}/>
                      </div>
                      
                      <div className="space-top col-md-4 col-lg-3">
                        <label htmlFor="inputCenterStatus"><h6>Status</h6></label>
                        <select type="text" value={center.centerStatus || 'default'} id="inputCenterStatus" className="form-control"
                        onChange={ e => {
                          if (e.target.value === 'default'){
                            updateCenterFieldFunc('centerStatus', '');
                          } else {
                            updateCenterFieldFunc('centerStatus', e.target.value);
                          }
                        }}>
                          <option>default</option>
                          <option>available</option>
                          <option>unavailable</option>
                        </select>
                      </div>


                      <div className="space-top col-md-4">
                        <label htmlFor="inputCenterCountry"><h6>Country</h6></label>
                        <input type="text" value={center.centerCountry || ''} id="inputCenterCountry" className={
                        (centerFieldError['centerCountry'] === undefined) ? "form-control" : "form-control field-error"
                        }
                        onChange={ e => {
                          if (e.target.value.length > 30)  {
                            e.target.value = center['centerCountry'];
                          } else {
                            updateCenterFieldFunc('centerCountry', e.target.value);
                          }
                        }}/>
                      </div>
                      <div className="space-top col-md-4">
                        <label htmlFor="inputCenterState"><h6>State</h6></label>
                        <input type="text" value={center.centerState || ''} id="inputCenterState" className={
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
                      <div className="space-top col-md-4">
                        <label htmlFor="inputCenterCity"><h6>City</h6></label>
                        <input type="text" value={center.centerCity || ''} id="inputCenterCity" className={
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
                      <div className="space-top col-12">
                        <label htmlFor="inputCenterAddress"><h6>Full address</h6></label>
                        <input type="text" value={center.centerAddress || ''} id="inputCenterAddress" className={
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

                      <div className="space-top col-md-6">
                        <label htmlFor="inputCenterCapacity"><h6>Capacity</h6></label>
                        <input type="text" value={center.centerCapacity || ''} id="centerCapacity" className={
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
                      <div className="space-top col-md-6">
                        <label htmlFor="inputCenterRate"><h6>Rate</h6></label>
                        <input type="text" value={center.centerRate || ''} id="inputCenterRate" placeholder="per hour" className={
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

                      <div className="space-top col-12">
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
                        <button className='btn space-top-sm' type='button' onClick={ e => {
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

                      <div className="space-top col-12">
                        <label htmlFor="inputCenterDescription"><h6>Short Description</h6></label>
                        <input type="text" value={center.centerDescription || ''} id="inputCenterDescription" placeholder="maximum of 120 characters" className={
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

                      <div className="space-top col-12">
                        <label htmlFor="inputCenterMantra"><h6>Mantra</h6></label>
                        <input type="text" value={center.centerMantra || ''} id="inputCenterMantra" placeholder="maximum of 50 characters" className={
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

                      <div className="space-top col-12">
                        <label className="btn" htmlFor="centerImgFile">Click to add image</label>
                        <input className="imgFileInput form-control" type="file" name="pic" accept="image/*" id="centerImgFile" onChange={ e => {
                          this.handleFiles(e.target.files);
                        }} />
                      </div>

                    </div>
                  </div>


                  <div className="d-flex flex-wrap" id="imagesContainer" ref={container => this.imageContainer=container } ></div>


                    <div className="d-flex  justify-content-end grp form-group">
                      {(type === "update")?
                        (
                          <button type="button" className="btn btn-warning grp-btn space-right-sm" onClick={ e => {
                            e.preventDefault();
                            updateCenterFunc(parseInt(centerId, 10), this.imgArray, this.srcArray);
                          }}>Update</button>
                        ):(
                          <button type="button" className="btn grp-btn space-right-sm" onClick={ e => {
                            e.preventDefault();
                            createCenterFunc(this.imgArray, this.srcArray);
                          }}>Create</button>
                        )
                      }
                      <button type="reset" className="btn btn-danger grp-btn" onClick={ e => {
                        const imageNodes = this.imageContainer.children;
                        while (this.imageContainer.firstChild) {
                          this.imageContainer.removeChild(this.imageContainer.firstChild);
                        }
                        this.imgArray = [];
                        resetFunc();
                      }}>Clear</button>
                    </div>

                </form>
              </div>
            </main>
            {(type === "update")?(null):(<Footer />)}
            
          </div>
        ) : <NotFound />

      )}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  const userType = state.user.accountUser.userType;
  return {
    centerFieldError: state.center.error.fieldError,
    center: state.center.center,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    centerId: ownProps.centerId,
    type: ownProps.type,
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

    updateCenterFieldFunc: (field=null, value=null) => {
      dispatch(updateCenterField(field, value));
      let msg;

      if (ownProps.type === "update") {
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
      } else {
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
      }
    },

    updateCenterFunc: (centerId, centerImageArray, srcArray) => {
      dispatch(updateCenter(centerId, centerImageArray, srcArray));
    },

    userLogoutFunc: () => {
      dispatch(userLogout());
    },

    resetFunc: () => {
      dispatch(resetCenterFields());
      dispatch(resetAppState());
    },

    createCenterFunc: (imageArray, srcArray) => {
      dispatch(createCenter(imageArray, srcArray));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterForm)
