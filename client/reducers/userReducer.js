export default function reducer(
  state={
    user: {},
    accountUser: {},
    passwordConfirmed: false,
    fetching: false,
    fetched: false,
    error: {
      fieldError: new Map(),
      fetchUserError: null,
    },
    infoTabMsg: null,
    showInfoMsg: false,
  }, action) {

	switch (action.type) {
    case 'USER_FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = new Map([...temp]);
      temp.set(action.payload.field, action.payload.msg);
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
      temp = new Map([...temp]);

      temp.delete(action.payload.field);
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    case 'PASSWORD_CONFIRMATION': {
      return {
        ...state,
        passwordConfirmed: action.payload.status,
      }
    }

    case 'SHOW_INFO_MESSAGE': {
      const temp = state.error.fieldError;
      const msg = [];
      temp.forEach((value, key) => {
        msg.push(temp.get(key));
      });

      // if (!state.passwordConfirmed) {
      //   msg.push('\'confirm password\' entry is different from \'password\' entry');
      // }
      return {
        ...state,
        showInfoMsg: action.payload.status,
        infoTabMsg: msg,
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
        error: Object.assign({}, state.error, {fetchUserError: action.payload.message}),
      }
    }

    case 'USER_SIGNUP_FULFILLED' : {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {fetchUserError: null}),
        user: action.payload.data.user,
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
        user: action.payload,
      }
    }

    case 'UPDATE_USER_REJECTED' : {
      return {
        ...state,
        user: action.payload,
      }
    }

    case 'UPDATE_USER_FULFILLED' : {
      return {
        ...state,
        user: action.payload,
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

    default: {
      return state;
    }
	}

}