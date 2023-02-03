export const REQ_LOGIN = "REQ_LOGIN";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const FAILD_LOGIN = "SUCCESS_LOGIN";


export const ReqestLogin = () => ({
    type: REQ_LOGIN,
});

export const SuccessLogin = (user) => ({
    type: SUCCESS_LOGIN,
    user: user
});

export const FaildLogin = (user) => ({
    type: FAILD_LOGIN,
    user: user
});
