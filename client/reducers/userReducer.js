export default function reducer(
  state={
    user: {},
    logs: [],
    accountUser: {},
    userToken: null,
    passwordConfirmed: true,
    fetching: false,
    fetched: false,
    error: {
      fieldError: {},
      serverError: null,
    },
  }, action) {

	switch (action.type) {
    case 'USER_FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = {...temp};
      temp[action.payload.field] =  action.payload.msg;
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    case 'UPDATE_USER_FIELD': {
      let temp = state.user;
      temp = {...temp};
      temp[action.payload.field] = action.payload.value;
      
      
      return {
        ...state,
        user: {...temp},
      }
    }

    case 'DELETE_USER_FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = {...temp};

      delete temp[action.payload.field];
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    // case 'CLEAR_USER': {
    //   return {
    //     ...state,
    //     user: {},
    //     error: Object.assign({}, state.error, {fieldError: new Map()}), 
    //   }
    // }

    case 'RESET_USER_FIELDS': {
      return {
        ...state,
        user: {},
        error: {
          fieldError: {},
          serverError: null,
        },
        logs: [],
      }
    }

    case 'PASSWORD_CONFIRMATION': {
      return {
        ...state,
        passwordConfirmed: action.payload.status,
      }
    }

		case 'USER_SIGNUP_PENDING' : {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'USER_SIGNUP_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message}),
      }
    }

    case 'USER_SIGNUP_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'CREATE_ADMIN_USER_PENDING' : {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'CREATE_ADMIN_USER_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message}),
      }
    }

    case 'CREATE_ADMIN_USER_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'USER_SIGNIN_PENDING' : {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'USER_SIGNIN_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
      }
    }

    case 'USER_SIGNIN_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
        accountUser: action.payload.data.user,
        userToken: action.payload.data.token,
      }
    }

    case 'USER_LOGOUT': {
      return {
        ...state,
        accountUser: {},
        userToken: null,
      }
    }

    case 'CREATE_USER_PENDING' : {
      return {
        ...state,
        user: action.payload,
      }
    }

    case 'CREATE_USER_FULFILLED' : {
      return {
        ...state,
        user: action.payload,
      }
    }

    case 'CREATE_USER_REJECTED' : {
      return {
        ...state,
        user: action.payload,
      }
    }

    case 'UPDATE_USER_PENDING' : {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'UPDATE_USER_REJECTED' : {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
      }
    }

    case 'UPDATE_USER_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        accountUser: action.payload.data.user,
      }
    }

    case 'DELETE_USER_PENDING' : {
      return {
        ...state,
        user: {
          id: action.payload,
        },
      }
    }

    case 'DELETE_USER_REJECTED' : {
      return {
        ...state,
        user: {
          id: action.payload,
        },
      }
    }

    case 'DELETE_USER_FULFILLED' : {
      return {
        ...state,
        user: {
          id: action.payload,
        },
      }
    }

    case 'FETCH_LOGS_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'FETCH_LOGS_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
      }
    }

    case 'FETCH_LOGS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
        logs: action.payload.data.logs,
      }
    }

    default: {
      return state;
    }
	}

}