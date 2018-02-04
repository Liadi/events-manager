import axios from 'axios';

module.exports = {
  userSignUp() {
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
        const temp = getState().user.error.fieldError;
        const msg = [];
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
