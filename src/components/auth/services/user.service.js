import axios from "axios";
import {authHeader} from "./auth-header";

const API_URL = "http://localhost:8080/auth/";

const forgotUserNameOrPassword = (value) => {
    return axios.post(API_URL + "/resetpassword", value);
};


export default {
    forgotUserNameOrPassword
};
