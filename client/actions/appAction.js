module.exports = {
  toggleAdvancedSearch() {
    return {
      type: 'TOGGLE_ADVANCED_SEARCH',
    }
  },

  toggleCenterUpdateForm() {
    return {
      type: 'TOGGLE_CENTER_UPDATE_FORM',
    }
  },

  toggleSlatedEvents() {
    return {
      type: 'TOGGLE_SLATED_EVENTS',
    }
  },

  toggleEventForm() {
    return {
      type: 'TOGGLE_EVENT_FORM',
    }
  },

  closeInfoTab() {
    return {
      type: 'CLOSE_INFO_TAB',
    }
  },

  openModal(mode, htmlContent, callBack) {
    return {
      type: 'OPEN_MODAL',
      payload: {
        htmlContent,
        callBack,
        mode,
      }
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
    console.log('----------about to change content');
    return {
      type: 'CHANGE_DASHBOARD_CONTENT',
      payload: {
        newContent,
      }
    }
  },
}
