import { combineReducers } from 'redux';
import productReducer from './productReducer';
import transactionReducer from './transactionReducer';
import orderReducer from './orderReducer';

const reducers = combineReducers({
	orderReducer,
	transactionReducer,
	productReducer
});

export default reducers;
