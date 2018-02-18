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

  createCenter(inputFieldSetArg) {
    // return function(dispatch, getState) {
    //   const fieldError = getState().center.error.fieldError;
    //   if (!getState().center.center.centerName) {
    //     dispatch({
    //       type: 'USER_FIELD_ERROR',
    //       payload: {
    //         field: 'userFirstName',
    //         msg: 'firstname required',
    //       }
    //     });
    //   }

    //   if (!getState().user.user.userEmail) {
    //     dispatch({
    //       type: 'USER_FIELD_ERROR',
    //       payload: {
    //         field: 'userEmail',
    //         msg: 'email required',
    //       }
    //     })
    //   }

    //   if (!getState().user.user.userPassword){
    //     dispatch({
    //       type: 'USER_FIELD_ERROR',
    //       payload: {
    //         field: 'userPassword',
    //         msg: 'password required',
    //       }
    //     });
    //   } else if (!getState().user.passwordConfirmed) {
    //     dispatch({
    //       type: 'USER_FIELD_ERROR',
    //       payload: {
    //         field: 'userPassword',
    //         msg: 'password confirmation failed',
    //       }
    //     });
    //   }
    //   if (Object.keys(getState().user.error.fieldError).length > 0) {
    //     let temp = getState().user.error.fieldError;
    //     let msg = [];
    //     for (let field in temp) {
    //       if (temp.hasOwnProperty(field)) {
    //         msg.push(temp[field]);
    //       }
    //     }
        
    //     dispatch ({
    //       type: 'OPEN_INFO_TAB',
    //       payload: {
    //         msg,
    //       }
    //     });
    //   } else {
    //     dispatch({
    //       type: 'USER_SIGNUP',
    //       payload: axios.post('api/v1/users/signup', getState().user.user),
    //     }).then(res => {
    //       dispatch({
    //         type: 'OPEN_MODAL',
    //         payload: {
    //           htmlContent: '<div><h4>Signup Successful</h4><Link to="/login">Log in</Link> to you account<div>',
    //         },
    //       });
    //       dispatch({
    //         type: 'RESET_USER_FIELDS',
    //       });
    //       for (let item of inputFieldSetArg) item.value = "";
    //     }).catch(err =>{
    //       let msg = [err.response.data.message]  || ['Server error. If this persists contact our technical team'];
    //       dispatch({
    //         type: 'OPEN_INFO_TAB',
    //         payload: {
    //           msg
    //         },
    //       });
    //     });
    //   }
    // }
  },

  centerFieldInputError(field, msg) {
    return{
      type: 'FIELD_ERROR',
      payload: {
        field,
        msg,
      },
    }
  },

  resetCenterFields() {
    return {
      type: 'RESET_CENTER_FIELDS',
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

  deleteCenterFieldError(field) {
    return {
      type: 'DELETE_CENTER_FIELD_ERROR',
      payload: {
        field,
      }
    }
  },

}
