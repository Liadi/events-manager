import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeInfoTab, closeModal, resetAppState } from '../actions/appAction';
import { userLogout } from '../actions/userAction';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import '../style/create-center.scss';
import { validateUser } from '../util';

const inputFieldSet = new Set();

class CreateCenter extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillUnmount() {
  }

  componentWillMount() {
  }

  render() {
    const { userType, userLogoutFunc, loggedIn } = this.props;
    return (
      <Route render={() => (
        loggedIn ? (
          <div>
            <Navbar userType={userType} userLogoutFunc={userLogoutFunc} />
            <main className="container mx-auto">
              <h3>Create Center</h3>
              <div className="container mx-auto" id="main-div">
                <form>
                  <div className="form-group">
                    <label htmlFor="inputCenterName"><h6>Name</h6></label>
                    <input type="text" id="inputCenterName" className={
                      (userFieldError['centerName'] === undefined) ? "form-control" : "form-control field-error"
                    }
                    onChange={ e => {
                        updateCenterFieldFunc('centerName', e.target.value);
                        inputFieldSet.add(e.target);
                      }
                    }/>
                  </div>

                  <div className="row">
                    <div className="form-group col-md-2 col-sm-4">
                      <label htmlFor="inputCenterCountry"><h6>Country</h6></label>
                      <input type="text" id="inputCenterCountry" className={
                      (userFieldError['centerCountry'] === undefined) ? "form-control" : "form-control field-error"
                    }
                    onChange={ e => {
                        updateCenterFieldFunc('centerCountry', e.target.value);
                        inputFieldSet.add(e.target);
                      }
                    }/>
                    </div>
                    <div className="form-group col-md-2 col-sm-4">
                      <label htmlFor="inputCenterState"><h6>State</h6></label>
                      <input type="text" id="inputCenterState" className={
                      (userFieldError['centerState'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                          updateCenterFieldFunc('centerState', e.target.value);
                          inputFieldSet.add(e.target);
                        }
                      }/>
                    </div>
                    <div className="form-group col-md-2 col-sm-4">
                      <label htmlFor="inputCenterCity"><h6>City</h6></label>
                      <input type="text" id="inputCenterCity" className={
                      (userFieldError['centerCity'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                          updateCenterFieldFunc('centerCity', e.target.value);
                          inputFieldSet.add(e.target);
                        }
                      }/>
                    </div>
                    <div className="form-group d-block col-md-6 ">
                      <label htmlFor="inputCenterAddress"><h6>Full address</h6></label>
                      <input type="text" id="inputCenterAddress" className={
                      (userFieldError['centerAddress'] === undefined) ? "form-control" : "form-control field-error"
                      }
                      onChange={ e => {
                          updateCenterFieldFunc('centerAddress', e.target.value);
                          inputFieldSet.add(e.target);
                        }
                      }/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputCenterCapacity"><h6>Capacity</h6></label>
                    <input type="text" id="centerCapacity" className={
                      (userFieldError['centerCapacity'] === undefined) ? "form-control" : "form-control field-error"
                    }
                    onChange={ e => {
                        updateCenterFieldFunc('centerCapacity', e.target.value);
                        inputFieldSet.add(e.target);
                      }
                    }/>
                  </div>        
                  <div className="form-group">
                    <label htmlFor="inputCenterRate"><h6>Rate</h6></label>
                    <input type="text" className="form-control" id="inputCenterRate" placeholder="per hour"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputCenterAmenities"><h6>Amenities</h6></label>
                    <input type="text" className="form-control" id="inputCenterAmenities" placeholder="e.g standby generator, toilets, air-conditioned..."/>
                    <ul id="amenitiesList"></ul>
                  </div>

                  <div className="form-group">
                    <input type="file" name="pic" accept="image/*" id="imgFile"/>
                    <button type="button" className="btn btn-warning grp-btn">Upload</button>
                  </div>
                  <div className="d-flex flex-wrap" id="imagesContainer">            
                  </div>
                  <div className="d-flex  justify-content-end grp form-group">
                    <button type="submit" className="btn btn-warning grp-btn">Add</button>
                    <button type="reset" className="btn btn-danger grp-btn">Clear</button>
                  </div>
                </form>
              </div>
            </main>

            <Footer />
          </div>
        ) : (
          <Redirect to={{
            pathname: '/'
          }}/>
        )

      )}/>
    )
  }
}

const mapStateToProps = (state) => {
  const loggedIn = validateUser(state.user.userToken, state.user.accountUser.userId);
  const userType = state.user.accountUser.userType;
  return {
  	userType,
    loggedIn,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    userLogoutFunc: () => {
      dispatch(userLogout());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCenter)
