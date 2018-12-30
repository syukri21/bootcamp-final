const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false
};

export default function orderReducer(state = initialState, action) {
	switch (action.type) {
		case 'ALL_ORDERS_PENDING':
			return { ...state, isLoading: true };
		case 'ALL_ORDERS_FULFILLED':
			return { ...state, isLoading: false, results: action.payload.data };
		case 'ALL_ORDERS_REJECTED':
			return { ...state, isLoading: false, isError: true };
		case 'GET_ORDER_PENDING':
			return { ...state, isLoading: true };
		case 'GET_ORDER_FULFILLED':
			return { ...state, isLoading: false, data: action.payload.data };
		case 'GET_ORDER_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
