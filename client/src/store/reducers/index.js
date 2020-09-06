import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import error from './error';

export default combineReducers({ alerts, auth, profile, error });
