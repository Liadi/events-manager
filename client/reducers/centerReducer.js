export default function reducer(
  state = {
    center: {},
    centers: [],
    fetching: false,
    fetched: false,
    error: {
      fieldError: new Map(),
      serverError: null,
    },
  },
  action) {

	switch (action.type) {
    case 'FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = {...temp};
      temp[action.payload.field] = action.payload.msg;
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    case 'UPDATE_CENTER_FIELD': {
      let temp = state.center;
      temp = {...temp};
      temp[action.payload.field] = action.payload.value;
      
      let errTemp = state.error.fieldError;
      errTemp = {...errTemp};
      errTemp[action.payload.field] = action.payload.msg;
      

      const ret = {
        ...state,
        center: {...temp},
        error: Object.assign({}, state.error, {fieldError: errTemp}),
      }
      delete ret.error.fieldError[action.payload.field];

      return ret
    }

    case 'RESET_CENTER_FIELDS': {
      return {
        ...state,
        center: {},
        error: {
          fieldError: new Map(),
          serverError: null,
        }
      }
    }

    case 'FETCH_CENTER_PENDING' : {
			return {
        ...state,
        fetching: true,
        fetched: false,
      }
		}

    case 'FETCH_CENTERS_PENDING' : {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'FETCH_CENTERS_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
      }
    }

    case 'FETCH_CENTERS_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
        centers: action.payload.data.centers,
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

    //`default: {
    
    // }
	}
  return state
}
