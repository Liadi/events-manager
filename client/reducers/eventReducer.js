export default function reducer(
  state = {
    event: {
      eventTime: {
        year: undefined,
        month: undefined,
        date: undefined,
      }
    },
    events: [],
    fetching: false,
    fetched: false,
    error: {
      fieldError: {},
      serverError: null,
    },
    page: 1,
    totalElement: 0,
    limit: 10,
    sort: {
      item: 'eventTime', order: 'INC'
    },
  },
  action) {

	switch (action.type) {
    case 'CREATE_EVENT_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'CREATE_EVENT_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message}),
      }
    }

    case 'CREATE_EVENT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'UPDATE_EVENT_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'UPDATE_EVENT_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message}),
      }
    }

    case 'UPDATE_EVENT_FULFILLED': {
      // find center in present array. If center exists update else push
      const eventsArray = state.events.slice(0, state.events.length);
      let found = false;
      const eventId = action.payload.data.event.id;
      for (let i in eventsArray) {
        if (eventsArray[i].id === eventId) {
          found = true;
          eventsArray[i] = action.payload.data.event
          break;
        }
      }
      if (!found) {
        eventsArray.push(action.payload.data.event);
      }
      return {
        ...state,
        fetching: false,
        fetched: true,
        events: eventsArray,
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'FETCH_EVENTS_PENDING' : {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'FETCH_EVENTS_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
      }
    }

    case 'FETCH_EVENTS_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
        events: action.payload.data.events,
        totalElement: action.payload.data.totalElement,
      }
    }

    case 'FETCH_EVENT_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'FETCH_EVENT_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
      }
    }

    case 'FETCH_EVENT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        events: [action.payload.data.event],
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'SET_EVENT_TIME': {
      const tempTime = {...state.event.eventTime};
      tempTime[action.payload.field] = action.payload.value;
      
      return {
        ...state,
        event: {
          ...state.event,
          eventTime: tempTime,
        }
      }
    }

    case 'UPDATE_EVENT_FIELD': {
      let temp = state.event;
      temp = {...temp};
      temp[action.payload.field] = action.payload.value; 

      return {
        ...state,
        event: {...temp},
      }
    }

    case 'RESET_EVENT_FIELDS': {
      return {
        ...state,
        event: {
          eventTime: {
            year: undefined,
            month: undefined,
            date: undefined,
          }
        },
        error: {
          fieldError: {},
          serverError: null,
        }
      }
    }

    case 'EVENT_FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = {...temp};
      temp[action.payload.field] = action.payload.msg;
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    case 'DELETE_EVENT_FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = {...temp};

      delete temp[action.payload.field];
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    case 'CHANGE_EVENT_PAGE': {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    default: {
      return state;
    }
	}
}
