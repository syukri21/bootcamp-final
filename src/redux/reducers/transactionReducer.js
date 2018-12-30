const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false,
	add: {}
};

export default function transactionReducer(state = initialState, action) {
	switch (action.type) {
		case 'ALL_TRANSACTIONS_PENDING':
			return { ...state, isLoading: true };
		case 'ALL_TRANSACTIONS_FULFILLED':
			return { ...state, isLoading: false, results: action.payload.data };
		case 'ALL_TRANSACTIONS_REJECTED':
			return { ...state, isLoading: false, isError: true };
		case 'GET_TRANSACTION_PENDING':
			return { ...state, isLoading: true };
		case 'GET_TRANSACTION_FULFILLED':
			return { ...state, isLoading: false, data: action.payload.data };
		case 'GET_TRANSACTION_REJECTED':
			return { ...state, isLoading: false, isError: true };
		case 'ADD_TRANSACTION_PENDING':
			return { ...state, isLoading: true };
		case 'ADD_TRANSACTION_FULFILLED':
			return { ...state, isLoading: false, add: action.payload.data };
		case 'ADD_TRANSACTION_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
