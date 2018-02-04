import axios from 'axios';

module.exports = {
  fetchCenters() {
    return function(dispatch, getState) {
      const {center} = getState().center;
      dispatch({
        type: 'FETCH_CENTERS',
        payload: axios.get('api/v1/centers', {params: center,})
      });
    }
	},

  fieldInputError(field, msg) {
    return{
      type: 'FIELD_ERROR',
      payload: {
        field,
        msg,
      },
    }
  },

  updateCenterField(field, value) {
    return {
      type: 'UPDATE_CENTER_FIELD',
      payload: {
        field,
        value,
      },
    } 
  },

}
