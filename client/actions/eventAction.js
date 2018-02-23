import axios from 'axios';

module.exports = {
  /* 
  tempParams is a Map
  */
  fetchEvents(tempParams = {}) {
    return function(dispatch, getState) {  
      // axios.get('api/v1/events', {params: eventParams}, {config}),
      const eventParams = {
        ...getState().event.event,
        limit: getState().event.limit,
        sort: JSON.stringify(getState().event.sort),
        page: getState().event.page,
        ...tempParams,
      }
      dispatch({
        type: 'FETCH_EVENTS',
        payload: axios({
          method: 'get',
          url: 'api/v1/events',
          params: eventParams,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      });
    }
  },
}
