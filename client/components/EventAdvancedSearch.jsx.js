import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';
import { getTimeOptions } from '../util';

class EventAdvancedSearch extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    [this.lowerYearOptions, this.lowerMonthOptions, this.lowerDateOptions, this.upperYearOptions, this.upperMonthOptions, this.upperDateOptions] = [[], [], [], [], [], []];
    this.inputFieldSet = new Set()
  }

  componentWillMount() {
    [this.lowerYearOptions, this.lowerMonthOptions, this.lowerDateOptions] = getTimeOptions(this.props.setEventTimeFunc, this.props.lowerTime, 'lower', true);

    [this.upperYearOptions, this.upperMonthOptions, this.upperDateOptions] = getTimeOptions(this.props.setEventTimeFunc, this.props.upperTime, 'upper', true);
  }
  
  componentWillReceiveProps(nextProps) {
    [this.lowerYearOptions, this.lowerMonthOptions, this.lowerDateOptions] = getTimeOptions(this.props.setEventTimeFunc, nextProps.lowerTime, 'lower');

    [this.upperYearOptions, this.upperMonthOptions, this.upperDateOptions] = getTimeOptions(this.props.setEventTimeFunc, nextProps.upperTime, 'upper');
  }

  render() {
    const {lowerTime, upperTime, showAdvanced, updateEventFieldFunc, setEventTimeFunc} = this.props;
    if (!showAdvanced){
      return null;
    }
    return (
      <div id= "advancedSearchFrame">
        <div className="form-row">    
          <div className="form-group col-md-2">
            <label htmlFor="searchName" className="form-label-sm">Name</label>
            <input type="text" className= "form-control form-control-sm" id="searchName" onChange={ e => {
              updateEventFieldFunc('eventName', e.target.value.trim());
            }}/>
          </div>
        </div>
        <div className="form-group section-group">
          <label htmlFor="eventTimeLower"><h6>From</h6></label>                        
          <div className="d-flex flex-wrap justify-content-around">

            <div className="form-group">
              <label htmlFor="eventYearLower">Year</label>
              <select className="form-control" id="eventYearLower" value={lowerTime.year} onChange={ e => {
                setEventTimeFunc('year', parseInt(e.target.value, 10), 'lower');
              }}>
                {this.lowerYearOptions.map((elem) => 
                  <option key={elem}>{elem}</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventMonthLower">Month</label>
              <select className="form-control" id="eventMonthLower" value={lowerTime.month} onChange={ e => {
                setEventTimeFunc('month', parseInt(e.target.value, 10), 'lower');
              }}>
                {this.lowerMonthOptions.map((elem) => 
                  <option key={elem}>{elem}</option>
                )}    
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventDateLower">Date</label>
              <select className="form-control" id="eventDateLower" value={lowerTime.date} onChange={ e => {
                setEventTimeFunc('date', parseInt(e.target.value, 10), 'lower');
              }}>
                {this.lowerDateOptions.map((elem) => 
                  <option key={elem}>{elem}</option>
                )}
              </select>
            </div>

          </div>
        </div>


        <div className="form-group section-group">
          <label htmlFor="eventTimeUpper"><h6>To</h6></label>                        
          <div className="d-flex flex-wrap justify-content-around">

            <div className="form-group">
              <label htmlFor="eventYearUpper">Year</label>
              <select className="form-control" id="eventYearUpper" value={upperTime.year} onChange={ e => {
                setEventTimeFunc('year', parseInt(e.target.value, 10), 'upper');
              }}>
                {this.upperYearOptions.map((elem) => 
                  <option key={elem}>{elem}</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventMonthUpper">Month</label>
              <select className="form-control" id="eventMonthUpper" value={upperTime.month} onChange={ e => {
                setEventTimeFunc('month', parseInt(e.target.value, 10), 'upper');
              }}>
                {this.upperMonthOptions.map((elem) => 
                  <option key={elem}>{elem}</option>
                )}    
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventDateUpper">Date</label>
              <select className="form-control" id="eventDateUpper" value={upperTime.date} onChange={ e => {
                setEventTimeFunc('date', parseInt(e.target.value, 10), 'upper');
              }}>
                {this.upperDateOptions.map((elem) => 
                  <option key={elem}>{elem}</option>
                )}
              </select>
            </div>

          </div>
        </div>
      </div>
    )
  }


} 

export default EventAdvancedSearch;
