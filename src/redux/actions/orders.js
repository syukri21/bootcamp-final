import axios from 'axios';
import { ip } from '../../config';
export function ALL_ORDERS() {
	return {
		type: 'ALL_ORDERS',
		payload: axios.get(`${ip}/orders`)
	};
}

export function ADD_ORDER(data) {
	return {
		type: 'ADD_ORDER',
		payload: axios.post(`${ip}/order`, data)
	};
}

export function UPDATE_ORDER(id, data) {
	return {
		type: 'UPDATE_ORDER',
		payload: axios.patch(`${ip}/order/${id}`, data)
	};
}

export function DELETE_ORDER(id) {
	return {
		type: 'DELETE_ORDER',
		payload: axios.delete(`${ip}/order/${id}`)
	};
}
