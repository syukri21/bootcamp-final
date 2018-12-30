import { AsyncStorage } from 'react-native';
const initialState = {
	login: null,
	register: null,
	isLoading: false,
	isError: false,
	isLoggend: false
};

export default async function userReducer(state = initialState, action) {
	switch (action.type) {
		case 'USER_LOGIN_PENDING':
			return { ...state, isLoading: true };
		case 'USER_LOGIN_FULFILLED':
			return { ...state, isLoading: false, login: action.payload.data, isLogged: true };
		case 'USER_LOGIN_REJECTED':
			return { ...state, isLoading: false, isError: true };
		case 'USER_REGISTER_PENDING':
			return { ...state, isLoading: true };
		case 'USER_REGISTER_FULFILLED':
			return { ...state, isLoading: false, register: action.payload.data };
		case 'USER_REGISTER_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
