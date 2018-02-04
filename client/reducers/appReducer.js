export default function reducer(
  state = {
    advancedSearch: false,
    infoTab: false,
    infoTabMsg: [],
  },
  action) {

	switch (action.type) {
		case 'TOGGLE_ADVANCED_SEARCH': {
      return {
        ...state,
        advancedSearch: !state.advancedSearch,
      }
    }
    case 'TOGGLE_INFO_TAB': {
      return {
        ...state,
        infoTab: !infoTab,
      }
    }
    case 'ADD_TAB_MSG': {
      return {
        ...state,
        infoTabMsg: action.payload.tabMsg,
      }
    }
    // default: {
    
    // }
	}
  return state
}
