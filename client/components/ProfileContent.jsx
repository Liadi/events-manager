import React from 'react';
import InfoTab from './InfoTab.jsx';
import ModalView from './ModalView.jsx';
const inputFieldSet = new Set();

const ProfileContent = (props) => {
  if (props.show) {
    const { userFieldError, infoTabMsg, showInfoTab, modalContent, showModal, closeModalFunc, closeInfoTabFunc, updateUserFieldFunc, updateUserFunc } = props;
    return (
      <div id="profileContent" className="tab-content">
        <InfoTab className='infoTab' infoTabMsg={infoTabMsg} showInfoTab={showInfoTab} closeInfoTabFunc={closeInfoTabFunc}/>
        <h4>
          Profile
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
                inputFieldSet.add(e.target);
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
                inputFieldSet.add(e.target);
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
                inputFieldSet.add(e.target);
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
                inputFieldSet.add(e.target);
              }} 
            />
          </div>
            
          <button type="button" className="btn" onClick={ e => {
            e.preventDefault();
            updateUserFunc(inputFieldSet);
          }}>
            Update
          </button>
        </form>
        <ModalView closeModalFunc={closeModalFunc} modalContent={modalContent} showModal={showModal}/>
      </div>
    );
  }
  return null;
}

export default ProfileContent;