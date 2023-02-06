import axios from "axios";
import { serverUrl } from "../../../ServerUrl";

export function GetAllRequest(){
    // console.log("Hellooooo", data);
    return axios.request({
        method:"get",
        url:`${serverUrl}/api/auth/getAll`,
        headers:{
            "authorization": sessionStorage.getItem("token")
        }
    })
}