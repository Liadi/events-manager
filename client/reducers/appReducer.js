export default function reducer(
  state = {
    advancedSearch: false,
    showInfoTab: false,
    infoTabMsg: [],
    showModal: false,
    modalContent: null,
    dashboardContent: null,
    records: {},
  },
  action) {

	switch (action.type) {
    // NOTE: reset app doesn't reset dashboard content
    case 'RESET_APP_STATE': {
      return {
        ...state,
        advancedSearch: false,
        showInfoTab: false,
        infoTabMsg: [],
        showModal: false,
        modalContent: null,
      }
    }
		case 'TOGGLE_ADVANCED_SEARCH': {
      return {
        ...state,
        advancedSearch: !state.advancedSearch,
      }
    }
    case 'CLOSE_INFO_TAB': {
      return {
        ...state,
        showInfoTab: false,
        infoTabMsg: [],
      }
    }
    case 'OPEN_INFO_TAB': {
      /* action.payload.msg should be array */ 
      return {
        ...state,
        showInfoTab: true,
        infoTabMsg: action.payload.msg,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        modalContent: action.payload.htmlContent,
        showModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        showModal: false,
        modalContent: null,
      }
    }
    case 'CHANGE_DASHBOARD_CONTENT': {
      return {
        ...state,
        dashboardContent: action.payload.newContent,
      }
    }
	}
  return state
}
