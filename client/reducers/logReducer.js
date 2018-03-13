export default function reducer(
  state={
    log: {},
    logs: [],
    page: 1,
    limit: 10,
    totalElement: 0,
    sort: {
      item: 'createdAt',
      order: 'DESC',
    },
    fetching: false,
    fetched: false,
    error: {
      fieldError: {},
      serverError: null,
    },
  }, action) {

  switch (action.type) {
    case 'RESET_LOG_FIELDS': {
      return {
        ...state,
        log: {},
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
      }        
    }

    case 'RESET_LOG_ENTRIES': {
      return {
        ...state,
        logs: [],
      }
    }

    case 'UPDATE_LOG_FIELD': {
      let temp = state.log;
      temp = {...temp};
      temp[action.payload.field] = action.payload.value;
      return {
        ...state,
        log: {...temp},
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
        totalElement: action.payload.data.totalElement,
      }
    }

    case 'CHANGE_LOG_PAGE': {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    case 'UPDATE_LOG_LIMIT': {
      return {
        ...state,
        limit: action.payload.limit,
      }
    }

    case 'UPDATE_LOG_SORT': {
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