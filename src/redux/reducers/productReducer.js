const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case 'ALL_PRODUCTS_PENDING':
			return { ...state, isLoading: true };
		case 'ALL_PRODUCTS_FULFILLED':
			return { ...state, isLoading: false, results: action.payload.data };
		case 'ALL_PRODUCTS_REJECTED':
			return { ...state, isLoading: false, isError: true };
		case 'GET_PRODUCT_PENDING':
			return { ...state, isLoading: true };
		case 'GET_PRODUCT_FULFILLED':
			return { ...state, isLoading: false, data: action.payload.data };
		case 'GET_PRODUCT_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
