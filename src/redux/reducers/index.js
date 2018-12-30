import { combineReducers } from 'redux';
import productReducer from './productReducer';
import transactionReducer from './transactionReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';
const reducers = combineReducers({
	orderReducer,
	transactionReducer,
	productReducer,
	userReducer
});

export default reducers;
