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
  changeDashboardContent(newContent) {
    console.log(newContent);
    return {
      type: 'CHANGE_DASHBOARD_CONTENT',
      payload: {
        newContent,
      }
    }
  },
}
