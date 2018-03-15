import React from 'react';
import { connect } from 'react-redux';
import InfoTab from './InfoTab.jsx';
import PageFetching from './PageFetching.jsx';
import { setEventTime, updateEventField, createEvent, updateEvent, resetEventFields } from '../actions/eventAction';
import { closeInfoTab } from '../actions/appAction';
import '../style/event-form.scss';
import { getTimeOptions } from '../util';


class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    [this.yearOptions, this.monthOptions, this.dateOptions] = [[], [], []];
    this.mountFunc = this.mountFunc.bind(this);
  }

  componentWillUnmount() {
    this.props.unmountFunc();
  }

  componentWillMount() {
    this.mountFunc();
  }

  mountFunc() {
    if (this.props.type === 'create') {
      [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, this.props.event.eventTime, this.props.type, true);
    } else if (this.props.type === 'update') {
      [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, this.props.event, this.props.type, true, this.props.currentEventTime);
    }
  }

  componentWillReceiveProps(nextProps) {
    [this.yearOptions, this.monthOptions, this.dateOptions] = getTimeOptions(this.props.setEventTimeFunc, nextProps.event.eventTime, this.props.type);
  }

  render() {
    const { event, resetEventFieldsFunc, fetching } = this.props;
    const time = this.props.event.eventTime;
    return (
      (fetching)?
      (
        <PageFetching a={console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')}/>
      ):(
        <div a={console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')} className="container">
          <InfoTab className="col-12" infoTabMsg={this.props.infoTabMsg} showInfoTab={this.props.showInfoTab} closeInfoTabFunc={this.props.closeInfoTabFunc}/>
            
          <div className="row">
            <form className="main-form card col-sm-9 col-lg-6 mx-auto">

              { this.props.closeFormFunc?
                (
                  <button className='btn badge badge-warning space-top-sm form-cancel' onClick={ e => {
                    e.preventDefault();
                    this.props.closeFormFunc(null);
                  }}>
                    <i className="fa fa-times"></i>
                  </button>
                ):(
                  null
                )
              }
              
              <div className="form-group section-group">
                <label htmlFor="eventName"><h6>Name</h6></label>
                <input type="text" value={event.eventName || ''} placeholder={"E.g " + this.props.userName.toUpperCase() + "\'s Birthday Party"} className="form-control" id="eventName" onChange={ e => {
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
                <textarea className="form-control" id="eventName" value={event.eventDescription || ''} placeholder= "Leave a message (500 characters max)" rows="5" onChange={ e => {
                  this.props.updateEventFieldFunc('eventDescription', e.target.value);
                }}>
                </textarea>
              </div>

              <div className="d-flex flex-wrap justify-content-end grp section-group">
                { this.props.type === 'create'?(
                  <button className="btn btn-warning grp-btn" onClick={ e => {
                    e.preventDefault();
                    this.props.createEventFunc(this.props.centerId);
                  }}>Create</button>
                ):(
                  <button className="btn btn-warning grp-btn" onClick={ e => {
                    e.preventDefault();
                    this.props.updateEventFunc(this.props.eventId);
                    resetEventFieldsFunc();
                    this.mountFunc();
                  }}>Update</button>
                )}
                <button type="reset" className="btn btn-danger grp-btn" onClick={ e => {
                  e.preventDefault();
                  resetEventFieldsFunc();
                  this.mountFunc();
                }}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.event.fetching,
    event: state.event.event,
    infoTabMsg: state.app.infoTabMsg,
    showInfoTab: state.app.showInfoTab,
    userName: state.user.accountUser.userFirstName,
    centerId: ownProps.centerId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setEventTimeFunc: (field, value) => {
      dispatch(setEventTime(field, value));
    },

    updateEventFieldFunc: (field, value) => {
      dispatch(updateEventField(field, value));
    },

    createEventFunc: (centerId) => {
      dispatch(createEvent(centerId));
    },

    updateEventFunc: (eventId, centerId) => {
      dispatch(updateEvent(eventId, centerId));
    },

    closeInfoTabFunc: () => {
      dispatch(closeInfoTab());
    },

    resetEventFieldsFunc: () => {
      dispatch(resetEventFields());
    },

    unmountFunc: () => {
      dispatch(resetEventFields());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm)
