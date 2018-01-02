export default function reducer(state={
  center: {},
  centers: [],
  fetching: false,
  fetched: false,
  error: null,
  advancedSearch: false,
}, action) {

	switch (action.type) {
		case 'TOGGLE_ADVANCED_SEARCH': {
      return {
        ...state,
        advancedSearch: !state.advancedSearch
      }
    }

    case 'FETCH_CENTER' : {
			return {
        ...state,
        fetching: true,
        fetched: false,
        center: action.payload,
      }
		}

    case 'FETCH_CENTERS' : {
      return {
        ...state,
        fetching: true,
        fetched: false,
        centers: action.payload,
      }
    }

    case 'FETCH_CENTER_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload.message,
      }
    }

    case 'FETCH_CENTER_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        center: action.payload.center,
      }
    }

    case 'FETCH_CENTERS_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        centers: action.payload.centers,
      }
    }

    case 'ADD_CENTER' : {
      return {
        ...state,
        center: action.payload,
      }
    }

    case 'UPDATE_CENTER' : {
      return {
        ...state,
        center: action.payload,
      }
    }

    case 'DELETE_CENTER' : {
      return {
        ...state,
        center: {
          id: action.payload,
        }
      }
    }

    // case default: {
    
    // }
	}
  return state
}