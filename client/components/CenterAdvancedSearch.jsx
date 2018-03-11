import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';

const CenterAdvancedSearch = (props) => {
  const updateCenterFieldFunc = props.updateCenterFieldFunc;
  const center = props.center;
  if (!props.showAdvanced){
    return null;
  }
  return (
    <div id= "advancedSearchFrame">
      <div className="form-row">    
        <div className="form-group col-md-2">
          <label htmlFor="searchCountry" className="form-label-sm">Country</label>
          <input type="text" className= "form-control form-control-sm" id="searchCountry" placeholder="Nigeria" disabled onChange={ e => {
            updateCenterFieldFunc('centerCountry', e.target.value.trim());
          }}/>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="searchState" className="form-label-sm">State</label>
          <input type="text" className="form-control form-control-sm" id="searchState" onChange={ e => {
            updateCenterFieldFunc('centerState', e.target.value.trim());
          }}/>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="searchCity" className="form-label-sm">City</label>
          <input type="text" className="form-control form-control-sm" id="searchCity" onChange={ e => {
            updateCenterFieldFunc('centerCity', e.target.value.trim());
          }}/>
        </div>
        
        <div className="form-group col-md-2">
          <label htmlFor="searchCapacity" className="form-label-sm">Capacity</label>
          <input type="text" className="form-control form-control-sm" id="searchCapacity" onChange={ e => {
            if (String(parseInt(e.target.value)) === e.target.value || e.target.value === "") {
              updateCenterFieldFunc('centerCapacity', e.target.value);
            } else {
              e.target.value = center.centerCapacity || "";
            }
          }}/>
        </div>
      </div>

      {props.loggedIn?(
        <div className='form-row'>

          <div className="form-group col-md-2">
            <label htmlFor="searchPriceLower" className="form-label-sm">Price</label>
            <input type="text" className="form-control form-control-sm" placeholder='Lower' id="searchPriceLower" onChange={ e => {
              if (String(parseInt(e.target.value)) === e.target.value || e.target.value === "") {
                updateCenterFieldFunc('centerPriceLower', e.target.value);
              } else {
                e.target.value = center.centerPriceLower || "";
              }
            }}/>
          </div>
          
          <div className="form-group col-md-2">
            <label htmlFor="searchPriceUpper" className="form-label-sm">Price</label>
            <input type="text" className="form-control form-control-sm" placeholder='Upper' id="searchPriceUpper" onChange={ e => {
              if (String(parseInt(e.target.value)) === e.target.value || e.target.value === "") {
                updateCenterFieldFunc('centerPriceUpper', e.target.value);
              } else {
                e.target.value = center.centerPriceUpper || "";
              }
            }}/>
          </div>

        </div>
      ):(
        null
      )}
        
    </div>
  )
}

export default CenterAdvancedSearch;
