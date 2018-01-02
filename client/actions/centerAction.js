import axios from 'axios';

module.exports = {
  fetchCenters(id) {
    return function(dispatch) {
      axios.get('api/v1/centers')
      .then((response) => {
        dispatch({type: 'FETCH_CENTER_FULFILLED', payload: response.data})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_CENTER_REJECTED', payload: response.message})
      })
    }

	},

  toggleAdvancedSearch() {
    return {
      type: 'TOGGLE_ADVANCED_SEARCH',
    }
  }

}
