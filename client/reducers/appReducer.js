export default function reducer(
  state = {
    advancedSearch: false,
    centerUpdateForm: false,
    eventForm: false,
    slatedEvents: false,
    showInfoTab: false,
    infoTabMsg: [],
    showModal: false,
    modalContent: null,
    modalMode: undefined,
    modalCallBack: undefined,
    dashboardContent: null,
  },
  action) {

	switch (action.type) {
    // NOTE: reset app doesn't reset dashboard content
    case 'RESET_APP_STATE': {
      return {
        ...state,
        advancedSearch: false,
        centerUpdateForm: false,
        eventForm: false,
        slatedEvents: false,
        showInfoTab: false,
        infoTabMsg: [],
        showModal: false,
        modalContent: null,
        modalMode: undefined,
        modalCallBack: undefined,
      }
    }
		case 'TOGGLE_ADVANCED_SEARCH': {
      return {
        ...state,
        advancedSearch: !state.advancedSearch,
      }
    }
    case 'TOGGLE_EVENT_FORM': {
      return {
        ...state,
        eventForm: !state.eventForm,
      }
    }
    case 'TOGGLE_CENTER_UPDATE_FORM': {
      return {
        ...state,
        centerUpdateForm: !state.centerUpdateForm,
      }
    }
    case 'TOGGLE_SLATED_EVENTS': {
      return {
        ...state,
        slatedEvents: !state.slatedEvents,
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
        modalMode: action.payload.mode,
        modalCallBack: action.payload.callBack,
        showModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        showModal: false,
        modalCallBack: undefined,
        modalContent: null,
        modalMode: undefined,
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
