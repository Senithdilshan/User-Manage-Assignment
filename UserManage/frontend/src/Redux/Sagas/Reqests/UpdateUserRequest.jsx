import axios from "axios";
import { serverUrl } from "../../../ServerUrl";

export function UserUpdateRequest(data){
    // console.log("Hellooooo", data);
    return axios.request({
        method:"put",
        url:`${serverUrl}/api/auth/updateUser`,
        data:{
            id:data.id,
            name:data.name,
            email:data.email,
        },
        headers:{
            "authorization": sessionStorage.getItem("token")
        }
    })
}