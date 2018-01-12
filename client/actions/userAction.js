import axios from 'axios';

module.exports = {
  userSignUp() {
    return function(dispatch, getState) {
      if (!getState().passwordConfirmed) {
        return {
          type: 'PASSWORD_CONFIRMATION_ERROR',
          payload: {
            msg: 'password conflict',
          }
        }
      } else {
        const {user} = getState().user;
        dispatch({
          type: 'USER_SIGNUP',
          payload: axios.post('api/v1/users/signup', {data: user,}),
        });
      }
    }
	},

  userFieldInputError(field, msg) {
    return{
      type: 'FIELD_ERROR',
      payload: {
        field,
        msg,
      },
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
