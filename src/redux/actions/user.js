import axios from 'axios';
import { ip } from '../../config';
import { AsyncStorage } from 'react-native';

export function USER_LOGIN(data, password) {
	return {
		type: 'USER_LOGIN',
		payload: axios.post(`${ip}/login`, data)
	};
}

export function USER_REGISTER(data) {
	return {
		type: 'USER_REGISTER',
		payload: axios.post(`${ip}/register`, data)
	};
}
