import axios from 'axios';
import history from '../history';

module.exports = {
  createUser(inputFieldSetArg, admin=false) {
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
        if (admin) {
          dispatch({
            type: 'CREATE_ADMIN_USER',
            payload: axios({
              method: 'post',
              url: 'api/v1/users/admin',
              data: getState().user.user,
              headers: {
                'token': getState().user.userToken,
              }
            }),
          }).then(res => {
            dispatch({
              type: 'OPEN_MODAL',
              payload: {
                htmlContent: '<h4>Admin user successful created</h4>',
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
        } else {
          dispatch({
            type: 'USER_SIGNUP',
            payload: axios.post('api/v1/users/signup', getState().user.user),
          }).then(res => {
            dispatch({
              type: 'OPEN_MODAL',
              payload: {
                htmlContent: '<div><h4>Signup Successful</h4>You can Log in with your details<div>',
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
    }
	},

  fetchAllUsers(tempParams = {}) {
    return function(dispatch, getState) {
      const userParams = {
        ...getState().user.user,
        limit: getState().user.limit,
        sort: JSON.stringify(getState().user.sort),
        page: getState().user.page,
        ...tempParams,
      }
      dispatch({
        type: 'FETCH_USERS',
        payload: axios({
          method: 'get',
          url: 'api/v1/users',
          params: userParams,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      });
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
    history.push('/');
    return {
      type: 'USER_LOGOUT',
    }
  },

  deleteAccount() {
    const func = () => {
      return function(dispatch, getState) {
        dispatch({
          type: 'DELETE_ACCOUNT',
          payload: axios({
            method: 'delete',
            url: `/api/v1/accounts`,
            headers: {
              'token': getState().user.userToken,
            }
          }),
        }).then((res) => {
          history.push('/');
          dispatch({
            type: 'OPEN_MODAL',
            payload: {
              htmlContent: '<h4>Account successfully deleted</h4>',
            },
          });
        }).catch((err) => {
          let msg;
          try {
            msg = [err.response.data.message];
          } catch(error){
            msg = ['Server error. If this persists contact our technical team'];
          }
          dispatch({
            type: 'OPEN_INFO_TAB',
            payload: {
              msg,
            },
          });
        })
      };
    }
    return func;
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
      let { userPassword, userConfirmPassword } = getState().user.user;
      if (!userPassword) {
        userPassword = getState().user.user.newUserPassword;
      }
      if (!userConfirmPassword) {
        userConfirmPassword = getState().user.user.confirmUserPassword;
      }
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
        if (getState().user.error.fieldError['newUserPassword'] === 'new password confirmation failed') {
          dispatch({
            type: 'DELETE_USER_FIELD_ERROR',
            payload: {
              field: 'newUserPassword',
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

  updateUser(inputFieldSetArg, type) {
    return function(dispatch, getState) {
      let [userField, userFieldError] = [{}, {}];
      if (type === 'others') {
        userField = {
          userFirstName: getState().user.user.userFirstName,
          userLastName: getState().user.user.userLastName,
          userEmail: getState().user.user.userEmail,
          userPhoneNumber: getState().user.user.userPhoneNumber,
        }
        userFieldError = {
          userFirstName: getState().user.error.fieldError.userFirstName,
          userLastName: getState().user.error.fieldError.userLastName,
          userEmail: getState().user.error.fieldError.userEmail,
          userPhoneNumber: getState().user.error.fieldError.userPhoneNumber,
        }
      } else {
        if (!getState().user.user.oldUserPassword){
          dispatch({
            type: 'USER_FIELD_ERROR',
            payload: {
              field: 'oldUserPassword',
              msg: 'password required',
            }
          });
        }
        if (!getState().user.user.newUserPassword){
          dispatch({
            type: 'USER_FIELD_ERROR',
            payload: {
              field: 'newUserPassword',
              msg: 'new password required',
            }
          });
        } else if (!getState().user.passwordConfirmed && !getState().user.error.fieldError.newUserPassword) {
          dispatch({
            type: 'USER_FIELD_ERROR',
            payload: {
              field: 'newUserPassword',
              msg: 'new password confirmation failed',
            }
          });
        }
        userField = {
          oldUserPassword: getState().user.user.oldUserPassword,
          newUserPassword: getState().user.user.newUserPassword,
        }
        userFieldError = {
          oldUserPassword: getState().user.error.fieldError.oldUserPassword,
          newUserPassword: getState().user.error.fieldError.newUserPassword,
        }
      }
      let nothingToChange = true;
      for (let item of inputFieldSetArg) {
        if (item.value !== "") {
          nothingToChange = false;
        };
      }
      if (nothingToChange) {
        if (type === 'others') {
          dispatch ({
            type: 'OPEN_INFO_TAB',
            payload: {
              msg: ['pls, fill 1 or more fields'],
            }
          });
          return;
        }      
      }
      let temp = userFieldError;
      let msg = [];
      for (let field in temp) {
        if (temp.hasOwnProperty(field)) {
          temp[field]?msg.push(temp[field]):null;
        }
      }
      if (msg.length > 0){
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg,
          }
        });
      } else {
        dispatch({
          type: 'UPDATE_USER',
          payload: axios({
            method: 'put',
            url: 'api/v1/users',
            data: userField,
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

  changeUserPage(page) {
    return {
      type: 'CHANGE_USER_PAGE',
      payload: {
        page,
      }
    }
  },

  updateUserLimit(limit) {
    return {
      type: 'UPDATE_USER_LIMIT',
      payload: {
        limit,
      }
    }
  },

  updateUserSortItem(item) {
    return {
      type: 'UPDATE_USER_SORT',
      payload: {
        item,
      }
    }
  },

  updateUserSortOrder(order) {
    return {
      type: 'UPDATE_USER_SORT',
      payload: {
        order,
      }
    }
  },

  resetUserFields() {
    return {
      type: 'RESET_USER_FIELDS',
    }
  },

  resetUserEntries() {
    return {
      type: 'RESET_USER_ENTRIES',
    }
  },
}
