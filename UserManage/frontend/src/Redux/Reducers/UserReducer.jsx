import { REQ_LOGIN, SUCCESS_LOGIN } from "../Ducks/User";

const initialState = {
    user: undefined
};

export const UserState = (data=[], action) => {
    switch (action.type) {
            case SUCCESS_LOGIN:
            const { user } = action;    
            console.warn(user);
            return { ...UserState, user: user };
        default:
            return data
    }
};