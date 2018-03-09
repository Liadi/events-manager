import React from 'react';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import { setEventTime, updateEventField, createEvent, updateEvent, resetEventFields } from '../actions/eventAction';
import { closeInfoTab } from '../actions/appAction';
import '../style/event-form.scss';
import { getTimeOptions } from '../util';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    [this.yearOptions, this.monthOptions, this.dateOptions] = [[], [], []];
    this.inputFieldSet = new Set()
  }

  componentWillUnmount() {
    this.props.unmountFunc(this.inputFieldSet);
  }

  componentWillMount() {
    if (this.props.type === 'create') {
      [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, this.props.event.eventTime, this.props.type, true);
    } else if (this.props.type === 'update')
      [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, this.props.event, this.props.type, true, this.props.currentEventTime);
    }

  componentWillReceiveProps(nextProps) {
    [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, nextProps.event.eventTime, this.props.type);
  }

  render() {
    const time = this.props.event.eventTime
    return (
      <div className="container">
        <InfoTab className="col-12" infoTabMsg={this.props.infoTabMsg} showInfoTab={this.props.showInfoTab} closeInfoTabFunc={this.props.closeInfoTabFunc}/>
          
        <div className="row">
          <form className="main-form card col-sm-9 col-lg-6 mx-auto">
            <div className="form-group section-group">
              <label htmlFor="eventName"><h6>Name</h6></label>
              <input type="text" className="form-control" id="eventName" placeholder={"E.g " + this.props.userName.toUpperCase() + "\'s Birthday Party"} onChange={ e => {
                this.inputFieldSet.add(e.target);
                this.props.updateEventFieldFunc('eventName', e.target.value);
              }}/>
            </div>

            <div className="form-group section-group">
              <div className="d-flex flex-wrap justify-content-between">

                <div className="form-group">
                  <label htmlFor="eventYear">Year</label>
                  <select className="form-control" id="eventYear" value={time.year} onChange={ e => {
                    this.props.setEventTimeFunc('year', parseInt(e.target.value, 10));
                  }}>
                    {this.yearOptions.map((elem) => 
                      <option key={elem}>{elem}</option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="eventMonth">Month</label>
                  <select className="form-control" id="eventMonth" value={time.month} onChange={ e => {
                    this.props.setEventTimeFunc('month', parseInt(e.target.value, 10));
                  }}>
                    {this.monthOptions.map((elem) => 
                      <option key={elem}>{elem}</option>
                    )}    
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="eventDate">Date</label>
                  <select className="form-control" id="eventDate" value={time.date} onChange={ e => {
                    this.props.setEventTimeFunc('date', parseInt(e.target.value, 10));
                  }}>
                    {this.dateOptions.map((elem) => 
                      <option key={elem}>{elem}</option>
                    )}
                  </select>
                </div>

              </div>
            </div>

            <div className="form-group section-group">
              <textarea className="form-control" id="eventName" placeholder="Leave a message (500 characters max)"  rows="5" onChange={ e => {
                this.inputFieldSet.add(e.target);
                this.props.updateEventFieldFunc('eventDescription', e.target.value);
              }}>
              </textarea>
            </div>

            <div className="d-flex flex-wrap justify-content-end grp section-group">
              { this.props.type === 'create'?(
                <button className="btn btn-warning grp-btn" onClick={ e => {
                  e.preventDefault();
                  this.props.createEventFunc(this.inputFieldSet, this.props.centerId);
                }}>Create</button>
              ):(
                <button className="btn btn-warning grp-btn" onClick={ e => {
                  e.preventDefault();
                  this.props.updateEventFunc(this.inputFieldSet.add(this.props.eventUpdateToggleInput), this.props.eventId);
                }}>Update</button>
              )}
              <button type="reset" className="btn btn-danger grp-btn">Clear</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.event.event,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    userName: state.user.accountUser.userFirstName,
    centerId: ownProps.centerId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEventTimeFunc: (field, value) => {
      dispatch(setEventTime(field, value));
    },

    updateEventFieldFunc: (field, value) => {
      dispatch(updateEventField(field, value));
    },

    createEventFunc: (inputFieldSetArg, centerId) => {
      dispatch(createEvent(inputFieldSetArg, centerId));
    },

    updateEventFunc: (inputFieldSet, eventId, centerId) => {
      dispatch(updateEvent(inputFieldSet, eventId, centerId));
    },

    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },

    unmountFunc: (inputFieldSet) => {
      if (inputFieldSet.size > 0) {
        dispatch(resetEventFields(inputFieldSet));
      } else {
        dispatch(resetEventFields());
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm)
