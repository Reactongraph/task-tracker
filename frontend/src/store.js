import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { taskReducer } from './reducer/taskReducer';
import { userReducer } from './reducer/userReducer';

const reducer = combineReducers({
    tasks: taskReducer,
    user: userReducer
});

let initialState = {};

const middleware = [ thunk ];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;