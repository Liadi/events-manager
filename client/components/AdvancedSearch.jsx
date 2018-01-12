import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';

const AdvancedSearch = (props) => {
  const updateCenterFieldFunc = props.updateCenterFieldFunc;
  if (!props.showAdvanced){
    return null;
  }
  
  let errorCapacityStyle = '';
  if (props.fieldError.centerCapacity !== undefined) {
    errorCapacityStyle = 'form-control form-control-sm col-md-4 field-error';
  }
  else {
    errorCapacityStyle = 'form-control form-control-sm col-md-4';
  }

  let errorPriceLowerStyle = '';
  if (props.fieldError.centerPriceLower !== undefined) {
    errorPriceLowerStyle = 'form-control form-control-sm field-error';
  }
  else {
    errorPriceLowerStyle = 'form-control form-control-sm';
  }

  let errorPriceUpperStyle = '';
  if (props.fieldError.centerPriceUpper !== undefined) {
    errorPriceUpperStyle = 'form-control form-control-sm field-error';
  }
  else {
    errorPriceUpperStyle = 'form-control form-control-sm';
  }

  return (
    <div id= "advancedSearchFrame">
      <div className="form-row">    
        <div className="form-group col-md-2">
          <label htmlFor="searchCountry" className="form-label-sm">Country</label>
          <input type="text" className= "form-control form-control-sm" id="searchCountry" placeholder="Nigeria" disabled onChange={ e => {
            updateCenterFieldFunc('centerCountry', e.target.value);
          }}/>

        </div>
        <div className="form-group col-md-2">
          <label htmlFor="searchState" className="form-label-sm">State</label>
          <input type="text" className="form-control form-control-sm" id="searchState" onChange={ e => {
            updateCenterFieldFunc('centerState', e.target.value);
          }}/>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="searchCity" className="form-label-sm">City</label>
          <input type="text" className="form-control form-control-sm" id="searchCity" onChange={ e => {
            updateCenterFieldFunc('centerCity', e.target.value);
          }}/>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="searchCapacity" className="form-label-sm">Capacity</label>
        <input type="text" className={errorCapacityStyle} id="searchCapacity" onChange={ e => {
          updateCenterFieldFunc('centerCapacity', e.target.value);
        }}/>
      </div>
      <div className="row container div-price-range">
        <div className="form-group card col-md-4">
          <label htmlFor="searchPrice"><h6>Price Range</h6></label>
          <div className="form-row mx-auto" id="searchPrice">
            <div className="form-group col-sm-6">
              <label htmlFor="searchPriceLower" className="form-label-sm">From</label>
              <input type="text" className={errorPriceLowerStyle} id="searchPriceLower" onChange={ e => {
                updateCenterFieldFunc('centerPriceLower', e.target.value);
              }}/>
            </div>
            <div className="form-group col-sm-6">
              <label htmlFor="searchPriceUpper" className="form-label-sm">To</label>
              <input type="text" className={errorPriceUpperStyle} id="searchPriceUpper" onChange={ e => {
            updateCenterFieldFunc('centerPriceUpper', e.target.value);
          }}/>
            </div>
          </div>
        </div>    
      </div>  
      <button id="reset-btn" className="btn" type="reset">Reset</button>
    </div>
  )
}

export default AdvancedSearch;
