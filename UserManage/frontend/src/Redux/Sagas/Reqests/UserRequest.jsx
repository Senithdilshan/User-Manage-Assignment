import axios from "axios";
import { serverUrl } from "../../../ServerUrl";

export function UserRequest(){
    return axios.request({
        method:"post",
        url:`${serverUrl}/api/auth/login`,
        data:{
            email:"amsdilshanofficial@gmail.com",
            password:"123456"
        }
    })
}