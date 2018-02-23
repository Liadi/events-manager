export default function reducer(
  state = {
    event: {},
    events: [],
    fetching: false,
    fetched: false,
    error: {
      fieldError: {},
      serverError: null,
    },
    limit: 10,
    sort: {
      item: 'eventTime', order: 'INC'
    },
  },
  action) {

	switch (action.type) {
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
      }
    }
    default: {
      return state;
    }
	}
}
