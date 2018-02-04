module.exports = {
  toggleAdvancedSearch() {
    return {
      type: 'TOGGLE_ADVANCED_SEARCH',
    }
  },

  toggleInfoTab() {
    return {
      type: 'TOGGLE_INFO_TAB',
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
