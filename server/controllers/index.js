import * as centerControllers from './centers';
import * as eventControllers from './events';
import * as userControllers from './users';
import db from './../models';

const { User, Log } = db; 

module.exports = {
  centerControllers,
	eventControllers,
  userControllers,
};
