import axios from 'axios';
import history from '../history';

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

  fetchCenter(id) {
    return function(dispatch, getState) {
      dispatch({
        type: 'FETCH_CENTER',
        payload: axios({
          method: 'get',
          url: `/api/v1/centers/${id}`,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      });
    }
  },

  createCenter(inputFieldSetArg) {
    return function(dispatch, getState) {
      const promiseFieldError = [];
      const fieldError = getState().center.error.fieldError;
      if (!getState().center.center.centerName) {
        promiseFieldError.push(
          dispatch({
            type: 'CENTER_FIELD_ERROR',
            payload: {
              field: 'centerName',
              msg: 'center name is required',
            }
          })
        )
      }

      if (!getState().center.center.centerCountry) {
        promiseFieldError.push(
          dispatch({
            type: 'CENTER_FIELD_ERROR',
            payload: {
              field: 'centerCountry',
              msg: 'center country is required',
            }
          })
        )
      }

      if (!getState().center.center.centerState) {
        promiseFieldError.push(
          dispatch({
            type: 'CENTER_FIELD_ERROR',
            payload: {
              field: 'centerState',
              msg: 'center state is required',
            }
          })
        )
      }

      if (!getState().center.center.centerAddress) {
        promiseFieldError.push(
          dispatch({
            type: 'CENTER_FIELD_ERROR',
            payload: {
              field: 'centerAddress',
              msg: 'center address is required',
            }
          })
        )
      }

      if (!getState().center.center.centerCapacity) {
        promiseFieldError.push(
          dispatch({
            type: 'CENTER_FIELD_ERROR',
            payload: {
              field: 'centerCapacity',
              msg: 'center capacity is required',
            }
          })
        )
      }

      if (!getState().center.center.centerRate) {
        promiseFieldError.push(
          dispatch({
            type: 'CENTER_FIELD_ERROR',
            payload: {
              field: 'centerRate',
              msg: 'center rate is required',
            }
          })
        )
      }

      Promise.all(promiseFieldError).then(() =>{
        console.log('set of promises or not => ', promiseFieldError);
        if (Object.keys(getState().center.error.fieldError).length > 0) {
          let temp = getState().center.error.fieldError;
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
            type: 'CREATE_CENTER',
            payload: axios({
              method: 'post',
              url: 'api/v1/centers',
              data: getState().center.center,
              headers: {
                'token': getState().user.userToken,
              }
            }),
          }).then( response => {
            console.log(response, history);
            dispatch({
              type: 'RESET_CENTER_FIELDS',
            })
            dispatch({
              type: 'RESET_APP_STATE',
            })
            for (let item of inputFieldSetArg) item.value = "";
            history.push(`/centers/${response.value.data.center.id}`);
          }).catch(err =>{
            console.log('checking 3', err);
            let msg = [err.response.data.message]  || ['Server error. If this persists contact our technical team'];
            console.log('checking 4');
            dispatch({
              type: 'OPEN_INFO_TAB',
              payload: {
                msg,
              },
            });
          });
        }

      });
    }
  },

  centerFieldInputError(field, msg) {
    return{
      type: 'CENTER_FIELD_ERROR',
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

  updateCenter(inputFieldSetArg, centerId) {
    const fieldError = getState().center.error.fieldError;
    if (Object.keys(fieldError).length > 0) {
      let msg = [];
      for (let field in fieldError) {
        if (fieldError.hasOwnProperty(field)) {
          msg.push(fieldError[field]);
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
        type: 'UPDATE_CENTER',
        payload: axios({
          method: 'put',
          url: `/api/v1/centers/${centerId}`,
          data: getState().center.center,
          headers: {
            'token': getState().user.userToken,
          }
        }),
      }).then((response) => {
        dispatch({
          type: 'RESET_CENTER_FIELDS',
        })
        dispatch({
          type: 'RESET_APP_STATE',
        })
        for (let item of inputFieldSetArg) item.value = "";
      }).catch((error) => {
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg: [getState().center.error.serverError],
          }
        });
      })
    }
  }

}
