export default function reducer(
  state={
    user: {},
    users: [],
    accountUser: {},
    userToken: null,
    passwordConfirmed: true,
    fetching: false,
    fetched: false,
    error: {
      fieldError: {},
      serverError: null,
    },
    page: 1,
    limit: 10,
    totalElement: 0,
    sort: {
      item: 'createdAt',
      order: 'INC',
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

    case 'RESET_USER_FIELDS': {
      return {
        ...state,
        user: {},
        page: 1,
        limit: 10,
        totalElement: 0,
        sort: {
          item: 'createdAt',
          order: 'DESC',
        },
        error: {
          fieldError: {},
          serverError: null,
        },
        passwordConfirmed: true,
      }
    }

    case 'RESET_USER_ENTRIES': {
      return {
        ...state,
        users: [],
        page: 1,
        limit: 10,
        totalElement: 0,
        sort: {
          item: 'createdAt',
          order: 'INC',
        },
        error: Object.assign({}, state.error, {serverError: null}),
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
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message || 'Server error. If this persists contact our technical team'}),
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

    case 'FETCH_USERS_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'FETCH_USERS_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message || 'Server error. If this persists contact our technical team'}),
        users: [],
      }
    }

    case 'FETCH_USERS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
        users: action.payload.data.users,
        totalElement: action.payload.data.totalElement,
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
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message || 'Server error. If this persists contact our technical team'}),
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

    case 'DELETE_ACCOUNT_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'DELETE_ACCOUNT_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message || 'Server error. If this persists contact our technical team'}),
      }
    }

    case 'DELETE_ACCOUNT_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        accountUser: {},
        userToken: null,
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
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message || 'Server error. If this persists contact our technical team'}),
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
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message || 'Server error. If this persists contact our technical team'}),
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

    case 'CHANGE_USER_PAGE': {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    case 'UPDATE_USER_LIMIT': {
      return {
        ...state,
        limit: action.payload.limit,
      }
    }

    case 'UPDATE_USER_SORT': {
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