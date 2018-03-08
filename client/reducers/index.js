import { combineReducers } from 'redux';

import center from './centerReducer';
import user from './userReducer';
import app from './appReducer';
import event from './eventReducer';
import log from './logReducer';

export default combineReducers ({
	center,
	user,
	app,
	event,
	log,
});
