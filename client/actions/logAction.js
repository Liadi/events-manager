import axios from 'axios';
import history from '../history';

module.exports = {
  resetLogFields() {
    return {
      type: 'RESET_LOG_FIELDS',
    }
  },

  restLogEntries() {
    return {
      type: 'RESET_LOG_ENTRIES',
    }
  },

  fetchUserLogs(tempParams={}) {
    return function(dispatch, getState) {  
      const logParams = {
        ...getState().log.log,
        limit: getState().log.limit,
        sort: JSON.stringify(getState().log.sort),
        page: getState().log.page,
        ...tempParams,
      }
      dispatch({
        type: 'FETCH_LOGS',
        payload: axios({
          method: 'get',
          url: 'api/v1/logs',
          params: logParams,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      });
    }
  },

  changeLogPage(page) {
    return {
      type: 'CHANGE_LOG_PAGE',
      payload: {
        page,
      }
    }
  },

  updateLogField(field, value) {
    return {
      type: 'UPDATE_LOG_FIELD',
      payload: {
        field,
        value,
      },
    } 
  },

  updateLogLimit(limit) {
    return {
      type: 'UPDATE_LOG_LIMIT',
      payload: {
        limit,
      }
    }
  },

  updateLogSortItem(item) {
    return {
      type: 'UPDATE_LOG_SORT',
      payload: {
        item,
      }
    }
  },

  updateLogSortOrder(order) {
    return {
      type: 'UPDATE_LOG_SORT',
      payload: {
        order,
      }
    }
  },
}
