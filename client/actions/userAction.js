import axios from 'axios';

module.exports = {
  userSignUp(inputFieldSetArg) {
    return function(dispatch, getState) {
      const fieldError = getState().user.error.fieldError;
      if (!getState().user.user.userFirstName) {
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userFirstName',
            msg: 'firstname required',
          }
        });
      }

      if (!getState().user.user.userEmail) {
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userEmail',
            msg: 'email required',
          }
        })
      }

      if (!getState().user.user.userPassword){
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userPassword',
            msg: 'password required',
          }
        });
      } else if (!getState().user.passwordConfirmed) {
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userPassword',
            msg: 'password confirmation failed',
          }
        });
      }
      if (getState().user.error.fieldError.size > 0) {
        let temp = getState().user.error.fieldError;
        let msg = [];
        temp.forEach((value, key) => {
          msg.push(value);
        });
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg,
          }
        });
      } else {
        dispatch({
          type: 'USER_SIGNUP',
          payload: axios.post('api/v1/users/signup', getState().user.user),
        }).then(res => {
          dispatch({
            type: 'OPEN_MODAL',
            payload: {
              htmlContent: '<div><h4>Signup Successful</h4><Link to="/login">Log in</Link> to you account<div>',
            },
          });
          dispatch({
            type: 'RESET_USER_FIELDS',
          });
          for (let item of inputFieldSetArg) item.value = "";
        }).catch(err =>{
          let msg = [err.response.data.message]  || ['Server error. If this persists contact our technical team'];
          dispatch({
            type: 'OPEN_INFO_TAB',
            payload: {
              msg
            },
          });
        });
      }
    }
	},

  userLogin(inputFieldSetArg) {
    return function(dispatch, getState) {
      if (!getState().user.user.userEmail) {
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userEmail',
            msg: 'email address is required',
          }
        });
      }

      if (!getState().user.user.userPassword) {
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userPassword',
            msg: 'password is required',
          }
        });
      }

      if (getState().user.error.fieldError.size > 0) {
        let temp = getState().user.error.fieldError;
        let msg = [];
        temp.forEach((value, key) => {
          msg.push(value);
        });
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg,
          }
        });
      } else {
        dispatch({
          type: 'USER_SIGNIN',
          payload: axios.post('api/v1/users/signin', getState().user.user),
        }).then(res => {
          dispatch({
            type: 'RESET_USER_FIELDS',
          });
          for (let item of inputFieldSetArg) item.value = "";
        }).catch(err =>{
          let msg = [err.response.data.message] || ['Server error. If this persists contact our technical team'];
          dispatch({
            type: 'OPEN_INFO_TAB',
            payload: {
              msg
            },
          });
        });
      } 

    }
  },

  userFieldInputError(field, msg) {
    return {
      type: 'USER_FIELD_ERROR',
      payload: {
        field,
        msg,
      },
    }
  },

  deleteUserFieldError(field) {
    return {
      type: 'DELETE_USER_FIELD_ERROR',
      payload: {
        field,
      }
    }
  },

  updatePasswordConfirmation() {
    return function(dispatch, getState) {
      const { userPassword, userConfirmPassword } = getState().user.user;
      if (userConfirmPassword !== userPassword){
        dispatch ({
          type: 'PASSWORD_CONFIRMATION',
          payload: {
            status: false,
          },
        });
      } else {
        dispatch({
          type: 'PASSWORD_CONFIRMATION',
          payload: {
            status: true,
          },
        });
        if (getState().user.error.fieldError.get('userPassword') === 'password confirmation failed') {
          dispatch({
            type: 'DELETE_USER_FIELD_ERROR',
            payload: {
              field: 'userPassword',
            }
          });
        }
      }
    }
  },

  updateUserField(field, value) {
    return {
      type: 'UPDATE_USER_FIELD',
      payload: {
        field,
        value,
      },
    } 
  },

}
