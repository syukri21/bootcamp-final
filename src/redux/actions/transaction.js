import axios from 'axios';
import { ip } from '../../config';
export function ADD_TRANSACTION(data) {
	return {
		type: 'ADD_TRANSACTION',
		payload: axios.post(`${ip}/transaction`, data)
	};
}

export function GET_TRANSACTION(id) {
	alert(id);
	return {
		type: 'GET_TRANSACTION',
		payload: axios.get(`${ip}/transaction/${id}`)
	};
}
