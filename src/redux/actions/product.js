import axios from 'axios';
import { ip } from '../../config';
export function ALL_PRODUCTS() {
	return {
		type: 'ALL_PRODUCTS',
		payload: axios.get(`${ip}/products`)
	};
}

export function ADD_PRODUCT(data) {
	return {
		type: 'ADD_PRODUCT',
		payload: axios.post(`${ip}/product`, data)
	};
}
