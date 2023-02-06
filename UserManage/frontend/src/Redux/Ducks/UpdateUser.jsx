export const REQ_UPDATE = "REQ_UPDATE";
export const SUCCESS_UPDATE = "SUCCESS_UPDATE";
export const FAILD_UPDATE = "FAILD_UPDATE";

export const ReqestUpdate = (data) => ({
    type: REQ_UPDATE,
    payload:data
});

export const SuccessUpdate = (posts) => ({
    type: SUCCESS_UPDATE,
    payload: posts
});

export const FaildUpdate = (error) => ({
    type: FAILD_UPDATE,
    payload: error,
});