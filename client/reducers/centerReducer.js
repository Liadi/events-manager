export default function reducer(
  state = {
    center: {},
    centers: [],
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
      item: 'centerRate',
      order: 'DESC',
    },
  },
  action) {

	switch (action.type) {
    case 'CENTER_FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = {...temp};
      temp[action.payload.field] = action.payload.msg;
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    case 'DELETE_CENTER_FIELD_ERROR': {
      let temp = state.error.fieldError;
      temp = {...temp};

      delete temp[action.payload.field];
      return {
        ...state,
        error: Object.assign({}, state.error, {fieldError: temp}),
      }
    }

    case 'UPDATE_CENTER_FIELD': {
      let temp = state.center;
      temp = {...temp};
      temp[action.payload.field] = action.payload.value;
      return {
        ...state,
        center: {...temp},
      }
    }

    case 'RESET_CENTER_FIELDS': {
      return {
        ...state,
        center: {},
        error: {
          fieldError: {},
          serverError: null,
        }
      }
    }

    case 'RESET_CENTER_ENTRIES': {
      return {
        ...state,
        centers: [],
        page: 1,
        limit: 10,
        totalElement: 0,
        sort: {
          item: 'centerRate',
          order: 'DESC',
        },
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'FETCH_CENTER_PENDING': {
			return {
        ...state,
        fetching: true,
        fetched: false,
      }
		}

    case 'FETCH_CENTER_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
      }
    }

    case 'FETCH_CENTER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        centers: state.centers.concat(action.payload.data.center),
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'FETCH_CENTERS_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'FETCH_CENTERS_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.message}),
        centers: [],
      }
    }

    case 'FETCH_CENTERS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: Object.assign({}, state.error, {serverError: null}),
        centers: action.payload.data.centers,
        totalElement: action.payload.data.totalElement,
      }
    }

    case 'CREATE_CENTER_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'CREATE_CENTER_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message}),
      }
    }

    case 'CREATE_CENTER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        centers: [action.payload.data.center],
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'UPDATE_CENTER_PENDING': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }

    case 'UPDATE_CENTER_REJECTED': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: Object.assign({}, state.error, {serverError: action.payload.response.data.message}),
      }
    }

    case 'UPDATE_CENTER_FULFILLED': {
      // find center in present array. If center exists update else push
      const centersArray = state.centers.slice(0, state.centers.length);
      let found = false;
      const centerId = action.payload.data.center.id;
      for (let i in centersArray) {
        if (centersArray[i].id === centerId) {
          found = true;
          centersArray[i] = action.payload.data.center
          break;
        }
      }
      if (!found) {
        centersArray.push(action.payload.data.center);
      }
      return {
        ...state,
        fetching: false,
        fetched: true,
        centers: centersArray,
        error: Object.assign({}, state.error, {serverError: null}),
      }
    }

    case 'CHANGE_CENTER_PAGE': {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    case 'UPDATE_CENTER_LIMIT': {
      return {
        ...state,
        limit: action.payload.limit,
      }
    }

    case 'UPDATE_CENTER_SORT': {
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
