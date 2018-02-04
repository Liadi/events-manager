module.exports = {
  fetchCenters() {
    return function(dispatch, getState) {
      const {center} = getState().center;
      dispatch({
        type: 'FETCH_CENTERS',
        payload: axios.get('api/v1/centers', {params: center,})
      });
    }
  },

  toggleAdvancedSearch() {
    return {
      type: 'TOGGLE_ADVANCED_SEARCH',
    }
  },

  toggleInfoTab() {
    return {
      type: 'TOGGLE_ADVANCED_SEARCH',
    }
  },
  updateTabMsg(msg) {
  	return {
      type: 'UPDATE_TAB_MSG',
      payload: {
        tabMsg,
      }
  	}
  }
}
