import axios from 'axios';
import history from '../history';

module.exports = {
  /* 
  tempParams is a Map
  */
  fetchEvents(tempParams = {}) {
    return function(dispatch, getState) {  
      // axios.get('api/v1/events', {params: eventParams}, {config}),
      const eventParams = {
        ...getState().event.event,
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

  resetEventFields(inputFieldSetArg=null) {
    if (inputFieldSetArg) {
      for (let item of inputFieldSetArg){
        if (item.type === 'checkbox'){
          item.checked = false;
        } else {
          item.value = "";
        }
      }
    }
    return {
      type: 'RESET_EVENT_FIELDS',
    }
  },

  createEvent(inputFieldSetArg, centerId) {
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
          for (let item of inputFieldSetArg) item.value = "";
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

  updateEvent(inputFieldSetArg, eventId, centerId) {
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
      
      const eventData =  Object.assign({centerId}, getState().event.event, {eventTime: tempDate})
      console.log('eventData => ', eventData);
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
          type: 'RESET_EVENT_FIELDS',
        })
        dispatch({
          type: 'RESET_APP_STATE',
        })
        for (let item of inputFieldSetArg){
          if (item.type === 'checkbox'){
            item.checked = false;
          } else {
            item.value = "";
          }
        }
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
}
