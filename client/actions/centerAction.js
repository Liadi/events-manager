import axios from 'axios';
import history from '../history';

module.exports = {
  fetchAllCenters(tempParams = {}) {
    return function(dispatch, getState) {
      const centerParams = {
        ...getState().center.center,
        limit: getState().center.limit,
        sort: JSON.stringify(getState().center.sort),
        page: getState().center.page,
        ...tempParams,
      }
      dispatch({
        type: 'FETCH_CENTERS',
        payload: axios({
          method: 'get',
          url: 'api/v1/centers',
          params: centerParams,
          headers: {
            'token': getState().user.userToken,
          }
        }),
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

  createCenter(centerImageArray, srcArray) {
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
          const data = new FormData();
          let centerData = getState().center.center;
          for (let i in centerData) {
            if (centerData[i] && centerData.hasOwnProperty(i)) {
              data.append(i, centerData[i]);
            }
          }

          for (let i in centerImageArray) {
            data.append('file', centerImageArray[i]);
          }
          dispatch({
            type: 'CREATE_CENTER',
            payload: axios({
              method: 'post',
              url: 'api/v1/centers',
              data, 
              headers: {
                'token': getState().user.userToken,
              }
            }),
          }).then( response => {
            for (let i in srcArray) {
              window.URL.revokeObjectURL(srcArray[i]);
            }
            history.push(`/centers/${response.value.data.center.id}`);
          }).catch(err =>{
            let msg = [err.response.data.message]  || ['Server error. If this persists contact our technical team'];

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

  deleteCenter(centerId){
    const func = () => {
      console.log("WHOOOOOOOP! Center, ", centerId, " just deleted. Although it's a facade ;) ");
    }
    return func;
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

  resetCenterEntries() {
    return {
      type: 'RESET_CENTER_ENTRIES',
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

  updateCenter(centerId, centerImageArray, srcArray) {
    return function(dispatch, getState) {
      const fieldError = getState().center.error.fieldError;
      const fieldInput = getState().center.center;
      let fieldsEmpty = true;
      let ErrorMsg = [];
      for (let field in fieldError) {
        if (fieldError.hasOwnProperty(field) && fieldError[field] !== '') {
          ErrorMsg.push(fieldError[field]);
        }
      }

      if (ErrorMsg.length > 0) {
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg: ErrorMsg,
          }
        });
        return;     
      }
      for (let field in fieldInput) {
        if (fieldInput.hasOwnProperty(field) && fieldInput[field] !== '') {
          fieldsEmpty = false;
          break;
        }
      }
      // Object.keys(fieldError).length
      if ( fieldsEmpty && centerImageArray.length === 0 ) {
        let msg = ['fill one or more fields'];
        dispatch ({
          type: 'OPEN_INFO_TAB',
          payload: {
            msg,
          }
        });
      } else {
        const data = new FormData();
        let centerData = getState().center.center;
        for (let i in centerData) {
          if (centerData[i] && centerData.hasOwnProperty(i)) {
            data.append(i, centerData[i]);
          }
        }
        for (let i in centerImageArray) {
          data.append('file', centerImageArray[i]);
        }
        dispatch({
          type: 'UPDATE_CENTER',
          payload: axios({
            method: 'put',
            url: `/api/v1/centers/${centerId}`,
            data,
            headers: {
              'token': getState().user.userToken,
            }
          }),
        }).then((response) => {
          for (let i in srcArray) {
            window.URL.revokeObjectURL(srcArray[i]);
          }
          dispatch({
            type: 'RESET_CENTER_FIELDS',
          })
          dispatch({
            type: 'RESET_APP_STATE',
          })
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
  },

  changeCenterPage(page) {
    return {
      type: 'CHANGE_CENTER_PAGE',
      payload: {
        page,
      }
    }
  },

  updateCenterLimit(limit) {
    return {
      type: 'UPDATE_CENTER_LIMIT',
      payload: {
        limit,
      }
    }
  },

  updateCenterSortItem(item) {
    return {
      type: 'UPDATE_CENTER_SORT',
      payload: {
        item,
      }
    }
  },

  updateCenterSortOrder(order) {
    return {
      type: 'UPDATE_CENTER_SORT',
      payload: {
        order,
      }
    }
  },
}
