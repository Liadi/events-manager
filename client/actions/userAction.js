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
      } else {
        dispatch({
          type: 'DELETE_USER_FIELD_ERROR',
          payload: {
            field: 'userFirstName',
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
      } else {
        dispatch({
          type: 'DELETE_USER_FIELD_ERROR',
          payload: {
            field: 'userEmail',
          }
        });
      }

      if (!getState().user.user.userPassword){
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userPassword',
            msg: 'password required',
          }
        });
      } else if (getState().user.user.userPassword.length < 6){
        dispatch({
          type: 'USER_FIELD_ERROR',
          payload: {
            field: 'userPassword',
            msg: 'password should not be less than 6 characters',
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
      } else {
        dispatch({
          type: 'DELETE_USER_FIELD_ERROR',
          payload: {
            field: 'userPassword',
          }
        });
      }
      if (getState().user.error.fieldError.size > 0) {
        dispatch ({
          type: 'SHOW_INFO_MESSAGE',
          payload: {
            status: true,
          }
        });
      } else {
        const temp = getState().user.user;
        delete temp.userConfirmPassword;
        const user = temp;
        dispatch({
          type: 'USER_SIGNUP',
          payload: axios.post('api/v1/users/signup', user),
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
