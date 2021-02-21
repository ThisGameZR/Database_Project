import counterReducer from './counter';
import loggedReducer from './isLogged';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counterReducer, // this is equal to counterReducer: counterReducter it is just ES6 sugar syntax
    isLogged: loggedReducer
})

export default allReducers;