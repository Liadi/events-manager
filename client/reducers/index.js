import { combineReducers } from 'redux';

import center from './centerReducer';
import user from './userReducer';

export default combineReducers ({
	center,
	user,
});
