import { FAILD_USER, GET_USER, SUCCESS_USER } from "../Ducks/GetUser";


const initialState = {
    loading: false,
    // data:null,
    users: [],
    errors: null,
};

export const GetAllReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            // console.log("reducer Check",action.data)
            return {
                ...state,
                // data:action.payload,
            };
        case SUCCESS_USER:
            return {
                ...state,
                loading: true,
                users: action.payload,
            };
        case FAILD_USER:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        default:
            return state;
    }
};