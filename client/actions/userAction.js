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
      if (Object.keys(getState().user.error.fieldError).length > 0) {
        let temp = getState().user.error.fieldError;
        let msg = [];
        for (let field in temp) {
          if (temp.hasOwnProperty(field)) {
            msg.push(temp[field]);
          }
        }
        
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

  userLogin() {
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

      if (Object.keys(getState().user.error.fieldError).length > 0) {
        let temp = getState().user.error.fieldError;
        let msg = [];
        for (let field in temp) {
          if (temp.hasOwnProperty(field)) {
            msg.push(temp[field]);
          }
        }
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

  userLogout() {
    return {
      type: 'USER_LOGOUT',
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
        if (getState().user.error.fieldError['userPassword'] === 'password confirmation failed') {
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

  updateUser(inputFieldSetArg) {
      return function(dispatch, getState) {
        let nothingToChange = true;
      for (let item of inputFieldSetArg) {
        if (item.value !== "") {
          nothingToChange = false;
        };
      }
      if (nothingToChange) {
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg: ['pls, fill 1 or more fields'],
          }
        });
        return;
      }
      if (Object.keys(getState().user.error.fieldError).length > 0) {
        let temp = getState().user.error.fieldError;
        let msg = [];
        for (let field in temp) {
          if (temp.hasOwnProperty(field)) {
            msg.push(temp[field]);
          }
        }
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg,
          }
        });
      } else {
        // dispatch({
        //   type: 'UPDATE_USER',
        //   payload: axios.put('api/v1/users', getState().user.user),
        // })
        console.log('data => ', getState().user.user);
        dispatch({
          type: 'UPDATE_USER',
          payload: axios({
            method: 'put',
            url: 'api/v1/users',
            data: getState().user.user,
            headers: {
              'token': getState().user.userToken,
            }
          }),
        }).then(res => {
          dispatch({
            type: 'OPEN_MODAL',
            payload: {
              htmlContent: '<div><h4>Update Successful</h4><div>',
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

  resetUserFields() {
    return {
      type: 'RESET_USER_FIELDS',
    }
  },

  fetchUserLogs(param) {
    return function(dispatch, getState) {  
      dispatch({
        type: 'FETCH_LOGS',
        payload: axios({
          method: 'get',
          url: 'api/v1/logs',
          params: param,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      });
    }
  }
}
