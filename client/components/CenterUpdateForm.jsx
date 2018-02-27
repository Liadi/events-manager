import React from 'react';
import { connect } from 'react-redux';
import AmenitiesList from './AmenitiesList.jsx';
import InfoTab from './InfoTab.jsx';
import '../style/create-center.scss';
import { updateCenter, updateCenterField, resetCenterFields } from '../actions/centerAction';
import { closeInfoTab } from '../actions/appAction';

class CenterUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.amenitiesInputElement = undefined;
    this.inputFieldSet = new Set();
  }

  componentWillUnmount() {
    this.props.unmountFunc(this.inputFieldSet);
  }

  componentWillMount() {
  }

  render() {
    const { center, userType, loggedIn, centerFieldError, updateCenterFieldFunc, updateCenterFunc, resetFunc, centerId, infoTabMsg, showInfoTab, closeInfoTabFunc } = this.props;

    return (
      <div>
        <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
        <form>
          <div className="form-group">
            <label htmlFor="inputCenterName"><h6>Name</h6></label>
            <input type="text" id="inputCenterName" className={
              (centerFieldError['centerName'] === undefined) ? "form-control" : "form-control field-error"
            }
            onChange={ e => {
              this.inputFieldSet.add(e.target);
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
                this.inputFieldSet.add(e.target);
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
                this.inputFieldSet.add(e.target);
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
                this.inputFieldSet.add(e.target);
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
                this.inputFieldSet.add(e.target);
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
              this.inputFieldSet.add(e.target);
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
              this.inputFieldSet.add(e.target);
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
              this.inputFieldSet.add(e.target);
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
              this.inputFieldSet.add(e.target);
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
              this.inputFieldSet.add(e.target);
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
              updateCenterFunc(this.inputFieldSet, parseInt(centerId, 10));
            }}>Update</button>
            <button type="reset" className="btn btn-danger grp-btn" onClick={ e => {
              resetFunc();
            }}>Clear</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    center: state.center.center,
    centerFieldError: state.center.error.fieldError,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    centerId: ownProps.centerId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
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

    updateCenterFunc: (inputFieldSet, centerId) => {
      dispatch(updateCenter(inputFieldSet, centerId));
    },

    unmountFunc: (inputFieldSet) => {
      ownProps.centerUpdateToggleInput.checked = false;
      if (inputFieldSet.size > 0) {
        dispatch(resetCenterFields(inputFieldSet));
      } else {
        dispatch(resetCenterFields());
      }
    },

    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CenterUpdateForm)