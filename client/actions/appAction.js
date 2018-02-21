module.exports = {
  toggleAdvancedSearch() {
    return {
      type: 'TOGGLE_ADVANCED_SEARCH',
    }
  },

  toggleCenterUpdateForm() {
    console.log('action fired');
    return {
      type: 'TOGGLE_CENTER_UPDATE_FORM',
    }
  },

  toggleSlatedEvents() {
    return {
      type: 'TOGGLE_SLATED_EVENTS',
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
