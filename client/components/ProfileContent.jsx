import React from 'react';
import InfoTab from './InfoTab.jsx';
import ModalView from './ModalView.jsx';
const updateSet = new Set();
const changeSet = new Set();

const ProfileContent = (props) => {
  if (props.show) {
    const { userFieldError, infoTabMsg, showInfoTab, modalContent, showModal, closeModalFunc, closeInfoTabFunc, updateUserFieldFunc, updateUserFunc, passwordConfirmed } = props;
    return (
      <div id="profileContent" className="tab-content">
        <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
        <h4>
          Profile
        </h4>
        <div>
          <div className="row profile-div">
            <div className="col-sm-5 profile-field">First Name</div>
            <div className="col-sm-7">Value</div>
          </div>
          <div className="row profile-div">
            <div className="col-sm-5 profile-field">Last Name</div>
            <div className="col-sm-7">Value</div>
          </div>
          <div className="row profile-div">
            <div className="col-sm-5 profile-field">Email Address</div>
            <div className="col-sm-7">Value</div>
          </div>
          <div className="row profile-div">
            <div className="col-sm-5 profile-field">Telephone</div>
            <div className="col-sm-7">Value</div>
          </div>

        </div>
        <div className="dropdown-divider"></div>
        <h4>
          Edit
        </h4>
        <form>
          <div className="form-group">
            <label htmlFor="inputFirstName">First Name</label>
            <input type="text"
              name="inputFirstName" 
              className={
                (userFieldError['userFirstName'] === undefined) ? "form-control" : "form-control field-error"
              }
              onChange={ e => {
                updateUserFieldFunc('userFirstName', e.target.value);
                updateSet.add(e.target);
              }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="inputLastName">Last Name</label>
            <input type="text"
              name="inputLastName" 
              className={
                (userFieldError['userLastName'] === undefined) ? "form-control" : "form-control field-error"
              }
              onChange={ e => {
                updateUserFieldFunc('userLastName', e.target.value);
                updateSet.add(e.target);
              }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input type="text"
              name="inputEmail" 
              className={
                (userFieldError['userEmail'] === undefined) ? "form-control" : "form-control field-error"
              }
              onChange={ e => {
                updateUserFieldFunc('userEmail', e.target.value);
                updateSet.add(e.target);
              }}
            />
          </div>
                
          <div className="form-group">
            <label htmlFor="inputTelephone">Telephone</label>
            <input type="text"
              name="inputTelephone" 
              className={
                (userFieldError['userPhoneNumber'] === undefined) ? "form-control" : "form-control field-error"
              }
              onChange={ e => {
                updateUserFieldFunc('userPhoneNumber', e.target.value);
                updateSet.add(e.target);
              }} 
            />
          </div>
            
          <button type="button" className="btn" onClick={ e => {
            e.preventDefault();
            updateUserFunc(updateSet, 'others');
          }}>
            Update
          </button>
        </form>
        <div className="dropdown-divider"></div>
        <h4>
          Change Password
        </h4>
        <form>
          <div className="form-group">
            <label htmlFor="inputOldPassword">Password</label>
            <input type="password"
              name="inputOldPassword" 
              className={
                (userFieldError['oldUserPassword'] === undefined) ? "form-control" : "form-control field-error"
              }
              onChange={ e => {
                updateUserFieldFunc('oldUserPassword', e.target.value);
                changeSet.add(e.target);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputNewPassword">New Password</label>
            <input type="password"
              name="inputNewPassword" 
              className={
                (userFieldError['newUserPassword'] === undefined) ? "form-control" : "form-control field-error"
              }
              onChange={ e => {
                updateUserFieldFunc('newUserPassword', e.target.value);
                changeSet.add(e.target);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputConfirmPassword">Confirm Password</label>
            <input type="password"
              name="inputConfirmPassword" 
              className={
                passwordConfirmed ? "form-control" : "form-control field-error"
              }
              onChange={ e => {
                updateUserFieldFunc('confirmUserPassword', e.target.value);
                changeSet.add(e.target);
              }}
            />
          </div>
          <button type="button" className="btn" onClick={ e => {
            e.preventDefault();
            updateUserFunc(changeSet, 'password');
          }}>
            Change
          </button> 
        </form>
        <ModalView closeModalFunc={closeModalFunc} modalContent={modalContent} showModal={showModal}/>
      </div>
    );
  }
  return null;
}

export default ProfileContent;