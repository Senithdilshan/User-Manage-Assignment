import axios from "axios";
import { serverUrl } from "../../../ServerUrl";

export function UserRequest(data){
    // console.log("Hellooooo", data);
    return axios.request({
        method:"post",
        url:`${serverUrl}/api/auth/login`,
        data:{
            email:data.email,
            password:data.password
        }
    })
}