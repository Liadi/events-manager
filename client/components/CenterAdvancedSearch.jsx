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
      </div>
      <div className="form-group">
        <label htmlFor="searchCapacity" className="form-label-sm">Capacity</label>
        <input type="text" className="form-control form-control-sm col-md-4" id="searchCapacity" onChange={ e => {
          if (String(parseInt(e.target.value)) === e.target.value || e.target.value === "") {
            updateCenterFieldFunc('centerCapacity', e.target.value);
          } else {
            e.target.value = center.centerCapacity || "";
          }
        }}/>
      </div>
      <div className="row container div-price-range">
        <div className="form-group card col-md-4">
          <label htmlFor="searchPrice"><h6>Price Range</h6></label>
          <div className="form-row mx-auto" id="searchPrice">
            <div className="form-group col-sm-6">
              <label htmlFor="searchPriceLower" className="form-label-sm">From</label>
              <input type="text" className="form-control form-control-sm" id="searchPriceLower" onChange={ e => {
                if (String(parseInt(e.target.value)) === e.target.value || e.target.value === "") {
                  updateCenterFieldFunc('centerPriceLower', e.target.value);
                } else {
                  e.target.value = center.centerPriceLower || "";
                }
              }}/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="searchPriceUpper" className="form-label-sm">To</label>
              <input type="text" className="form-control form-control-sm" id="searchPriceUpper" onChange={ e => {
                if (String(parseInt(e.target.value)) === e.target.value || e.target.value === "") {
                  updateCenterFieldFunc('centerPriceUpper', e.target.value);
                } else {
                  e.target.value = center.centerPriceUpper || "";
                }
              }}/>
            </div>
          </div>
        </div>    
      </div>  
    </div>
  )
}

export default CenterAdvancedSearch;
