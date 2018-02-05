import { combineReducers } from 'redux';

import center from './centerReducer';
import user from './userReducer';
import app from './appReducer';

export default combineReducers ({
	center,
	user,
	app,
});
