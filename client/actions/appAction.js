module.exports = {
  toggleAdvancedSearch() {
    return {
      type: 'TOGGLE_ADVANCED_SEARCH',
    }
  },

  closeInfoTab() {
    return {
      type: 'CLOSE_INFO_TAB',
    }
  },
  closeModal() {
    return {
      type: 'CLOSE_MODAL',
    }
  },
  resetAppState() {
    return {
      type: 'RESET_APP_STATE',
    }
  },
  changeDashboardContent(newContent) {
    return {
      type: 'CHANGE_DASHBOARD_CONTENT',
      payload: {
        newContent,
      }
    }
  },
}
