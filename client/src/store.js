import {applyMiddleware, legacy_createStore as createStore} from 'redux';

import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};
const middleWare = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store