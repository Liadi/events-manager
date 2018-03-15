module.exports = {
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
    return {
      type: 'CHANGE_DASHBOARD_CONTENT',
      payload: {
        newContent,
      }
    }
  },
}
