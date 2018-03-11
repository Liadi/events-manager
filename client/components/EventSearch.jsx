import React from 'react';
import EventAdvancedSearch from './EventAdvancedSearch.jsx';
import CenterSearchResult from './CenterSearchResult.jsx';
import '../style/index.scss';
import { connect } from 'react-redux';
import { toggleAdvancedSearch } from '../actions/appAction';
import { updateEventField, fetchEvents, updateEventSortOrder, updateEventSortItem, updateEventLimit, setEventTime, changeEventPage, resetEventAdvancedFields } from '../actions/eventAction';

class EventSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render () {
    const { event, orderValue, showAdvanced, updateEventFieldFunc, setEventTimeFunc, updateEventSortItemFunc, updateEventLimitFunc, updateEventSortOrderFunc, toggleAdvancedSearchFunc, fetchSearchedEventFunc, resetEventAdvancedFieldsFunc } = this.props;
    return (
      <form className="search-form">
        <div>
          <div className="input-group space-top">
            <input type="text" className="form-control form-control-sm" placeholder="Search for event" 
            onChange={ e => {
              updateEventFieldFunc('eventName', e.target.value.trim());
            }}/>
            <span className="input-group-btn">
              <button type="submit" className="btn" onClick={ e => {
                e.preventDefault();
                fetchSearchedEventFunc();
              }}>
                <i className="fa fa-search fa-1x mx-auto" aria-hidden="true"></i>
              </button>
            </span>
          </div>

          <div className="row">
            <div className="form-group">
              <label htmlFor="pageSize">Page size</label>
              <select className="form-control form-control-sm" id="pageSize" defaultValue='10' onChange={ e => {
                updateEventLimitFunc(parseInt(e.target.value, 10));
              }}>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
                <option>60</option>
                <option>70</option>
                <option>80</option>
                <option>90</option>
                <option>100</option>
              </select>
            </div>

            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="order" id="orderAscending" value="INC" checked={orderValue==='INC'?(true):(false)} onChange={ e => {
                  updateEventSortOrderFunc(e.target.value);
                }}/>
                <label className="form-check-label" htmlFor="orderAscending">
                  earliest to latest
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="order" id="orderDescending" value="DESC" checked={orderValue==='DESC'?(true):(false)} onChange={ e => {
                  updateEventSortOrderFunc(e.target.value);
                }}/>
                <label className="form-check-label" htmlFor="orderDescending">
                  latest to earliest
                </label>
              </div>
            </div>
          </div>

          <div className="space-top">
            <button type="button" className="search-toggle" onClick={ e => {
              e.preventDefault();
              if (showAdvanced) {
               resetEventAdvancedFieldsFunc();
              }
              toggleAdvancedSearchFunc();
            }}
            >
            Advanced Search
            </button>
          </div>
        </div>
        { showAdvanced ? 
          (
            <EventAdvancedSearch event={event} showAdvanced={showAdvanced} updateEventFieldFunc={updateEventFieldFunc} setEventTimeFunc={setEventTimeFunc} />
          ):(
            null      
          )
        }
        
        <button id="reset-btn" className="btn" type="reset">Reset</button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showAdvanced: state.app.advancedSearch,
    fetching: state.event.fetching,
    fetched: state.event.fetched,
    event: state.event.event,
    orderValue: state.event.sort.order,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAdvancedSearchFunc: () => {
      dispatch(toggleAdvancedSearch());
    },

    updateEventFieldFunc: (field, value) => {
      dispatch(updateEventField(field, value));
    },

    updateEventSortOrderFunc: (order) => {
      dispatch(updateEventSortOrder(order));
      dispatch(changeEventPage(1));
      dispatch(fetchEvents());
    }, 

    updateEventSortItemFunc: (item) => {
      dispatch(updateEventSortItem(item));
      dispatch(changeEventPage(1));
      dispatch(fetchEvents());
    },

    updateEventLimitFunc: (limit) => {
      dispatch(updateEventLimit(limit));
      dispatch(changeEventPage(1));
      dispatch(fetchEvents());
    },

    setEventTimeFunc: (field, value, type) => {
      dispatch(setEventTime(field, value, type));
    },

    fetchSearchedEventFunc: () => {
      dispatch(changeEventPage(1));
      dispatch(fetchEvents());
    },

    resetEventAdvancedFieldsFunc: () => {
      dispatch(resetEventAdvancedFields());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSearch);
