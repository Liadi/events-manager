export default function reducer(
  state = {
    event: {
      eventTime: {
        year: undefined,
        month: undefined,
        date: undefined,
      },
      eventAmountPaidLower: 0,
      eventAmountPaidUpper: 100,
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
      item: 'eventTime',
      order: 'INC',
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
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message || 'Server error. If this persists contact our technical team'}),
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
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message || 'Server error. If this persists contact our technical team'}),
      }
    }

    case 'UPDATE_EVENT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        events: [action.payload.data.event],
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
        error: Object.assign({}, state.error, {serverError: action.payload.message || 'Server error. If this persists contact our technical team'}),
        events: [],
        totalElement: 0,
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
        error: Object.assign({}, state.error, {serverError: action.payload.message || 'Server error. If this persists contact our technical team'}),
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
          },
          eventAmountPaidLower: 0,
          eventAmountPaidUpper: 100,
        },
        error: {
          fieldError: {},
          serverError: null,
        }
      }
    }

    case 'RESET_EVENT_ENTRIES': {
      return {
        ...state,
        events: [],
        page: 1,
        limit: 10,
        totalElement: 0,
        sort: {
          item: 'eventTime',
          order: 'INC',
        },
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'RESET_EVENT_ADVANCED_FIELDS': {
      
      const tempEvent = {
        eventTime: {
          year: undefined,
          month: undefined,
          date: undefined,
        },
        eventAmountPaidLower: 0,
        eventAmountPaidUpper: 100,
      }
      if (state.event.eventName)  {
        tempEvent.eventName = state.event.eventName;
      }

      return {
        ...state,
        event: tempEvent,
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

    case 'UPDATE_EVENT_LIMIT': {
      return {
        ...state,
        limit: action.payload.limit,
      }
    }

    case 'UPDATE_EVENT_SORT': {
      return {
        ...state,
        sort: {
          item: action.payload.item || state.sort.item,
          order: action.payload.order || state.sort.order,
        },
      }
    }

    default: {
      return state;
    }
  }
}