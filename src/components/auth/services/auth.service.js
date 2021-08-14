import axios from "axios";

const login = (values) => {
    return axios
        .post(
            "http://localhost:8080/auth/signin",
            values
        )
        .then((response) => {
            if (response.data.data.jwt) {

                localStorage.setItem("user", JSON.stringify(response.data.data));
            } else {
                return response.data;
            }
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    login,
    logout,
    getCurrentUser,
};
// {
//     "data"
// :
//     {
//         "jwt"
//     :
//         "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXlhcyIsImV4cCI6MTYyODg5ODE1MCwiaWF0IjoxNjI4ODYyMTUwfQ.IJbKQ10HfzINnN945ay87wmp7MyCik31BOoMG2AZ5bI", "user"
//     :
//         {
//             "username"
//         :
//             "fayas", "password"
//         :
//             "$2a$10$T4R6qgwVidZxUs8tVXdYjODLPSmQI..22XgYvkhoSF3ynGewop8pe", "authorities"
//         :
//             [{"authority": "ROLE_ADMIN"}], "enabled"
//         :
//             true, "accountNonExpired"
//         :
//             true, "accountNonLocked"
//         :
//             true, "credentialsNonExpired"
//         :
//             true
//         }
//     }
// ,
//     "meta"
// :
//     {
//         "status"
//     :
//         1, "detail"
//     :
//         "Success"
//     }
// }
