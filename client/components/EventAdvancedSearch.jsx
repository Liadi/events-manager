import React from 'react';
import { Link } from 'react-router-dom';
import '../style/index.scss';
import { getTimeOptions } from '../util';

class EventAdvancedSearch extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    [this.lowerYearOptions, this.lowerMonthOptions, this.lowerDateOptions, this.yearOptions, this.monthOptions, this.dateOptions] = [[], [], [], [], [], []];
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
        <div className="form-group">
          <div className="row">
            <div className="col-sm-4 col-md-3 col-lg-2">
              <label htmlFor="searchCenterName" className="form-label-sm">Center</label>
              <input type="text" className= "form-control form-control-sm" id="searchCenterName" onChange={ e => {
                updateEventFieldFunc('centerName', e.target.value.trim());
              }}/>
            </div>
            <div className="col-sm-4 col-md-3 col-lg-2">
              <label htmlFor="searchStatus" className="form-label-sm">Status</label>
              <select type="text" className= "form-control form-control-sm" id="searchStatus" onChange={ e => {
                updateEventFieldFunc('eventStatus', e.target.value);
              }}>
                <option>upcoming</option>
                <option>successful</option>
                <option>cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="row">
            <div className="col-sm-4 col-md-3 col-lg-2">
              <label htmlFor="searchStatus" className="form-label-sm">amount lower(%)</label>
              <select type="text" value={lowerAmount || 0} className= "form-control form-control-sm" id="searchStatus" onChange={ e => {
                updateEventFieldFunc('eventAmountPaidLower', e.target.value);
              }}>
                {percentValue.map((elem, index) => {
                  if (elem <= upperAmount) {
                    return(<option key={elem}>{elem}</option>)
                  }
                })}
              </select>
            </div>
            <div className="col-sm-4 col-md-3 col-lg-2">
              <label htmlFor="searchStatus" className="form-label-sm">amount upper(%)</label>
              <select type="text" value={upperAmount || 100} className="form-control form-control-sm" id="searchStatus" onChange={ e => {
                updateEventFieldFunc('eventAmountPaidUpper', e.target.value);
              }}>
                {percentValue.map((elem, index) => {
                  if (elem >= lowerAmount) {
                    return(<option key={elem}>{elem}</option>)
                  }
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="row">
            <div className="col-sm-4 col-md-3 col-lg-2">
              <label htmlFor="eventYear">Year</label>
              <select className="form-control form-control-sm" id="eventYear" value={time.year} onChange={ e => {
                setEventTimeFunc('year', parseInt(e.target.value, 10));
              }}>
                {this.yearOptions.map((value) => 
                  <option key={value}>{value}</option>
                )}
              </select>
            </div>

            <div className="col-sm-4 col-md-3 col-lg-2">
              <label htmlFor="eventMonth">Month</label>
              <select className="form-control form-control-sm" id="eventMonth" value={time.month} onChange={ e => {
                setEventTimeFunc('month', parseInt(e.target.value, 10));
              }}>
                {this.monthOptions.map((value) =>
                  <option key={value}>{value}</option>
                )}
              </select>
            </div>

            <div className="col-sm-4 col-md-3 col-lg-2">
              <label htmlFor="eventDate">Date</label>
              <select className="form-control form-control-sm" id="eventDate" value={time.date} onChange={ e => {
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
