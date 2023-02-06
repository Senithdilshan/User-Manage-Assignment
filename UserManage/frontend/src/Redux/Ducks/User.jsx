export const REQ_LOGIN = "REQ_LOGIN";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const FAILD_LOGIN = "FAILD_LOGIN";

export const ReqestLogin = (userLog) => ({
    type: REQ_LOGIN,
    payload:userLog
});

export const SuccessLogin = (posts) => ({
    type: SUCCESS_LOGIN,
    payload: posts
});

export const FaildLogin = (error) => ({
    type: FAILD_LOGIN,
    payload: error,
});
