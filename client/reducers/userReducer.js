export default function reducer(state={
  user: {},
  fetching: false,
  fetched: false,
  error: null,
}, action) {

	switch (action.type) {
		case 'FETCH_USER' : {
			return {
        ...state,
        fetching: true,
        fetched: false,
        user: action.payload,
      }
		}

    case 'FETCH_USER_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload.message,
      }
    }

    case 'FETCH_USER_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        user: action.payload.user,
      }
    }

    case 'ADD_USER' : {
      return {
        ...state,
        user: action.payload,
      }
    }

    case 'UPDATE_USER' : {
      return {
        ...state,
        user: action.payload,
      }
    }

    case 'DELETE_USER' : {
      return {
        ...state,
        user: {
          id: action.payload,
        },
      }
    }

    // case default: {
    return state
    // }
	}

}