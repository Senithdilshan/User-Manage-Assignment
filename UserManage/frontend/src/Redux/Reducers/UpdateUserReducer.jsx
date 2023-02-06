import { FAILD_UPDATE, REQ_UPDATE, SUCCESS_UPDATE } from "../Ducks/UpdateUser";


const initialState = {
    loading: true,
    log:[],
    posts: [],
    errors: null,
};

export const UpdateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQ_UPDATE:
            return {
                ...state,
                log: action.payload,
            };
        case SUCCESS_UPDATE:
            return {
                ...state,
                loading: true,
                posts: action.payload,
            };
        case FAILD_UPDATE:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        default:
            return state;
    }
};