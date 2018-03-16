import axios from 'axios';
import history from '../history';

module.exports = {
  /* 
  tempParams is a Map
  */
  fetchEvents(tempParams = {}) {
    return function(dispatch, getState) {  
      let eventParams;
      const temp = getState().event.event.eventTime;
      if (temp.year && temp.month && temp.date) { 
        let tempDate = temp.year.toString()
        if (temp.month.toString().length === 1) {
          tempDate += '-0' + temp.month.toString()
        } else {
          tempDate += '-' + temp.month.toString()
        }
        if (temp.date.toString().length === 1) {
          tempDate += '-0' + temp.date.toString()
        } else {
          tempDate += '-' + temp.date.toString()
        } 
        eventParams = Object.assign({}, getState().event.event, {eventTime: tempDate})
      } else {
        eventParams = Object.assign({}, getState().event.event, {eventTime: undefined});
      }

      eventParams = {
        ...eventParams,
        limit: getState().event.limit,
        sort: JSON.stringify(getState().event.sort),
        page: getState().event.page,
        ...tempParams,
      }

      dispatch({
        type: 'FETCH_EVENTS',
        payload: axios({
          method: 'get',
          url: 'api/v1/events',
          params: eventParams,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      });
    }
  },

  fetchEvent(id) {
    return function(dispatch, getState) {
      dispatch({
        type: 'FETCH_EVENT',
        payload: axios({
          method: 'get',
          url: `/api/v1/events/${id}`,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      });
    }
  },

  resetEventFields() {
    return {
      type: 'RESET_EVENT_FIELDS',
    }
  },

  resetEventEntries() {
    return {
      type: 'RESET_EVENT_ENTRIES',
    }
  },

  resetEventAdvancedFields() {
    return {
      type: 'RESET_EVENT_ADVANCED_FIELDS',
    }
  },

  createEvent(centerId) {
    return function(dispatch, getState) {
      const fieldError = getState().event.error.fieldError;
      if (!getState().event.event.eventName) {
        dispatch({
          type: 'EVENT_FIELD_ERROR',
          payload: {
            field: 'eventName',
            msg: 'event name is required',
          }
        })
      } else {
        dispatch({
          type: 'DELETE_EVENT_FIELD_ERROR',
          payload: {
            field: 'eventName',
          }
        })
      }

      if (Object.keys(getState().event.error.fieldError).length > 0) {
        let temp = getState().event.error.fieldError;
        let msg = [];
        for (let field in temp) {
          if (temp.hasOwnProperty(field)) {
            msg.push(temp[field]);
          }
        }
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg,
          }
        });
      } else {
        const temp = getState().event.event.eventTime;
        let tempDate = temp.year.toString()
        
        if (temp.month.toString().length === 1) {
          tempDate += '-0' + temp.month.toString()
        } else {
          tempDate += '-' + temp.month.toString()
        }
        if (temp.date.toString().length === 1) {
          tempDate += '-0' + temp.date.toString()
        } else {
          tempDate += '-' + temp.date.toString()
        }
        
        const eventData =  Object.assign({centerId: centerId.toString()}, getState().event.event, {eventTime: tempDate})
        dispatch({
          type: 'CREATE_EVENT',
          payload: axios({
            method: 'post',
            url: '/api/v1/events',
            data: eventData,
            headers: {
              'token': getState().user.userToken,
            }
          }),
        }).then( response => {
          dispatch({
            type: 'RESET_EVENT_FIELDS',
          })
          history.push(`/events/${response.value.data.event.id}`);
        }).catch(err =>{
          let msg = [err.response.data.message]  || ['Server error. If this persists contact our technical team'];
          dispatch({
            type: 'OPEN_INFO_TAB',
            payload: {
              msg,
            },
          });
        });
      }
    }
  },

  deleteEvent(eventId){
    const func = () => {
      return function(dispatch, getState) {
        dispatch({
          type: 'DELETE_EVENT',
          payload: axios({
            method: 'delete',
            url: `/api/v1/events/${eventId}`,
            headers: {
              'token': getState().user.userToken,
            }
          }),
        }).then((res) => {
          dispatch({
            type: 'CHANGE_EVENT_PAGE',
            payload: {
              page: 1,
            }
          });
          history.push('/events');
          dispatch({
            type: 'OPEN_MODAL',
            payload: {
              htmlContent: '<h4>Event successfully deleted</h4>',
            },
          });
        }).catch((err) => {
          let msg = [err.response.data.message]  || ['Server error. If this persists contact our technical team'];
          dispatch({
            type: 'OPEN_INFO_TAB',
            payload: {
              msg,
            },
          });
        })
      };
    }
    return func;
  },

  updateEvent(eventId) {
    return function(dispatch, getState) {
      const temp = getState().event.event.eventTime;
      let tempDate = temp.year.toString()
      
      if (temp.month.toString().length === 1) {
        tempDate += '-0' + temp.month.toString()
      } else {
        tempDate += '-' + temp.month.toString()
      }
      if (temp.date.toString().length === 1) {
        tempDate += '-0' + temp.date.toString()
      } else {
        tempDate += '-' + temp.date.toString()
      }
      
      const eventData =  Object.assign({}, getState().event.event, {eventTime: tempDate})
      dispatch({
        type: 'UPDATE_EVENT',
        payload: axios({
          method: 'put',
          url: `/api/v1/events/${eventId}`,
          data: eventData,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      }).then((response) => {
        dispatch({
          type: 'RESET_APP_STATE',
        })
        dispatch({
          type: 'OPEN_MODAL',
          payload: {
            htmlContent: '<h4>Event successfully updated</h4>',
          },
        });
      }).catch((error) => {
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg: [getState().event.error.serverError],
          }
        });
      })
    }
  },

  setEventTime(field, value) {
    return {
      type: 'SET_EVENT_TIME',
      payload: {
        field,
        value,
      } 
    }
  },

  updateEventField (field, value) {
    return {
      type: 'UPDATE_EVENT_FIELD',
      payload: {
        field,
        value,
      } 
    }
  },

  eventFieldInputError(field, msg) {
    return{
      type: 'EVENT_FIELD_ERROR',
      payload: {
        field,
        msg,
      },
    }
  },

  deleteEventFieldError(field) {
    return {
      type: 'DELETE_EVENT_FIELD_ERROR',
      payload: {
        field,
      }
    }
  },

  changeEventPage(page) {
    return {
      type: 'CHANGE_EVENT_PAGE',
      payload: {
        page,
      }
    }
  },

  updateEventLimit(limit) {
    return {
      type: 'UPDATE_EVENT_LIMIT',
      payload: {
        limit,
      }
    }
  },

  updateEventSortItem(item) {
    return {
      type: 'UPDATE_EVENT_SORT',
      payload: {
        item,
      }
    }
  },

  updateEventSortOrder(order) {
    return {
      type: 'UPDATE_EVENT_SORT',
      payload: {
        order,
      }
    }
  },
}
