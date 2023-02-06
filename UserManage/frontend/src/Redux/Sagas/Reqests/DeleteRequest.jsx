import axios from "axios";
import { serverUrl } from "../../../ServerUrl";

export function UserDeleteRequest(data){
    // console.log("Hellooooo", data);
    return axios.request({
        method:"delete",
        url:`${serverUrl}/api/auth/deleteUser/${data}`,
        headers:{
            "authorization": sessionStorage.getItem("token")
        }
    })
}