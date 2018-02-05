export default function reducer(
  state = {
    advancedSearch: false,
    showInfoTab: false,
    infoTabMsg: [],
    showModal: false,
    modalContent: null,
  },
  action) {

	switch (action.type) {
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
	}
  return state
}
