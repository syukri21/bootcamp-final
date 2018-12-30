import axios from 'axios';
import { ip } from '../../config';


export function  USER_LOGIN(data){
	return {
		type: 'ADD_TRANSACTION',
		payload: axios.post(`${ip}/login`, data)
	};
}  


export function  USER_REGISTER(data){
	return {
		type: 'ADD_TRANSACTION',
		payload: axios.post(`${ip}/register`, data)
	};

}  