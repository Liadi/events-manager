import axios from 'axios';

module.exports = {
  /* 
  tempParams is a Map
  */
  fetchEvents(eventParams) {
    return function(dispatch, getState) {  
      // axios.get('api/v1/events', {params: eventParams}, {config}),
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
