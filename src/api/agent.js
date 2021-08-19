import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const config = {
  headers: { Authorization: `Bearer ${localStorage.token}` },
};

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(sleep(1000).then(responseBody)),
  getSecured: (url) =>
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then(responseBody),
  post:(url,body)=> axios.post(url,body).then(responseBody)
};

export const Auth ={
  login :loginCredential=> requests.post(`/auth/signin`,loginCredential)
} 

export const AdminDashboard ={
  fetchUsers:(url)=>requests.getSecured('/user/all',config)
}
