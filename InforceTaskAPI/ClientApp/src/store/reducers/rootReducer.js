import {combineReducers} from 'redux';
import userReducer from './userReducer'


var rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer