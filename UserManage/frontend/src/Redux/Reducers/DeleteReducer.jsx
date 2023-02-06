import { FAILD_DELETE, REQ_DELETE, SUCCESS_DELETE } from "../Ducks/DeleteUser";



const initialState = {
    loading: true,
    id:[],
    posts: [],
    errors: null,
};

export const DeleteUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQ_DELETE:
            return {
                ...state,
                id: action.payload,
            };
        case SUCCESS_DELETE:
            return {
                ...state,
                loading: true,
                posts: action.payload,
            };
        case FAILD_DELETE:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        default:
            return state;
    }
};