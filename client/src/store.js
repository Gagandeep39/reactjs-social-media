import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// Will look for file named index.js inside reducer folder
import rootRoducer from './store/reducers';

const initialState = {}
const middleware = [thunk]
const store = createStore(
  rootRoducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
