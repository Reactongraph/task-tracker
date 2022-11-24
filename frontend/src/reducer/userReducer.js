import { USER_FAIL, USER_SUCCESS, USER_REQUEST, CLEAR_ERRORS } from '../constants/taskConstants';

export const userReducer = (state = { user: [], error: null }, action) => {
	switch (action.type) {
		case USER_REQUEST:
			return{
				loading:true,
				user: []
			};

		case USER_SUCCESS:
			return{
				loading:false,
				user: action.payload,
				error: null
			};

		case USER_FAIL:
			return{
				loading:false,
				error: action.payload,
				user: []
			};

		case CLEAR_ERRORS:
			return{
				...state,
				error: action.payload
			};	

		default:
			return state;
	}
};
