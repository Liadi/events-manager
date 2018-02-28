import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';
import { getTimeOptions } from '../util';

class EventAdvancedSearch extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    [this.lowerYearOptions, this.lowerMonthOptions, this.lowerDateOptions, this.yearOptions, this.monthOptions, this.dateOptions] = [[], [], [], [], [], []];
    this.inputFieldSet = new Set()
  }

  componentWillMount() {
    [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, this.props.event.eventTime, 'search', true );
  }
  
  componentWillReceiveProps(nextProps) {
    [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, nextProps.event.eventTime, 'search');
  }

  render() {
    if (!this.props.showAdvanced){
      return null;
    }
    const {event, updateEventFieldFunc, setEventTimeFunc} = this.props;
    const {eventTime, eventAmountPaidLower, eventAmountPaidUpper} = event;
    const [time, lowerAmount, upperAmount ] =  [eventTime, eventAmountPaidLower, eventAmountPaidUpper]
    const percentValue = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return (
      <div id= "advancedSearchFrame">
        <div className="form-row">    
          <div className="form-group col-md-2">
            <label htmlFor="searchCenterName" className="form-label-sm">Center</label>
            <input type="text" className= "form-control form-control-sm" id="searchCenterName" onChange={ e => {
              updateEventFieldFunc('centerName', e.target.value.trim());
            }}/>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="searchStatus" className="form-label-sm">Status</label>
            <select type="text" className= "form-control form-control-sm" id="searchStatus" onChange={ e => {
              updateEventFieldFunc('eventStatus', e.target.value);
            }}>
              <option>upcoming</option>
              <option>successful</option>
              <option>cancelled</option>
            </select>
          </div>
          <label>Amount Paid (percentage)</label>
          <div className="form-group col-md-5">
            <label htmlFor="searchAmountLower" className="form-label-sm">From</label>
            <select className= "form-control form-control-sm" id="searchAmountLower" value={eventAmountPaidLower} onChange={ e => {
              updateEventFieldFunc('eventAmountPaidLower', parseInt(e.target.value, 10));
            }}>
              {percentValue.map( value =>
                (value <= upperAmount)?(
                  <option key={value}>{value}</option>
                ):(
                  null
                ) 
              )}
            </select>

            <label htmlFor="searchAmountUpper" className="form-label-sm">To</label>
            <select className= "form-control form-control-sm" id="searchAmountUpper" value={eventAmountPaidUpper} onChange={ e => {
              updateEventFieldFunc('eventAmountPaidUpper', parseInt(e.target.value, 10));
            }}>
              {percentValue.map( value =>
                (value >= lowerAmount)?(
                  <option key={value}>{value}</option>
                ):(
                  null
                ) 
              )}
            </select>
          </div>
        </div>

        <div className="form-group section-group">
          <label htmlFor="eventTimeUpper"><h6>To</h6></label>                        
          <div className="d-flex flex-wrap justify-content-around">

            <div className="form-group">
              <label htmlFor="eventYear">Year</label>
              <select className="form-control" id="eventYear" value={time.year} onChange={ e => {
                setEventTimeFunc('year', parseInt(e.target.value, 10));
              }}>
                {this.yearOptions.map((value) => 
                  <option key={value}>{value}</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventMonth">Month</label>
              <select className="form-control" id="eventMonth" value={time.month} onChange={ e => {
                setEventTimeFunc('month', parseInt(e.target.value, 10));
              }}>
                {this.monthOptions.map((value) =>
                  <option key={value}>{value}</option>
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="eventDate">Date</label>
              <select className="form-control" id="eventDate" value={time.date} onChange={ e => {
                setEventTimeFunc('date', parseInt(e.target.value, 10));
              }}>
                {this.dateOptions.map((value) =>
                  <option key={value}>{value}</option>                
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
