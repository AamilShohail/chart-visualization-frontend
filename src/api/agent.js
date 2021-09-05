import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

const JWTconfig = {
  headers: { Authorization: `Bearer ${localStorage.token}` },
};
const FormDataConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.token}`,
    "content-type": "multipart/form-data",
  },
};

const responseBody = (response) => response.data;

// for testing
const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  getSecured: (url) => axios.get(url, JWTconfig).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  formUrlPost: (url, file) => {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post(url, formData, FormDataConfig).then(responseBody);
  },
};

export const Auth = {
  login: (loginCredential) => requests.post(`/auth/signin`, loginCredential),
};

export const AdminDashboard = {
  fetchUsers: (url) => requests.getSecured("/user/all"),
  uploadSheet: (id, file) => {
    id = parseInt(id);
    return requests.formUrlPost(`excel/upload/${id}`, file);
  },
};

export const RegisterUser = (values) => {
  return axios.post(axios.defaults.baseURL + "/auth/signup", values);
};
export const Sheet = {
  fetchSheetsMeta: () => requests.getSecured("/meta/sheet"),
  fetchSheetById: (id) => requests.getSecured(`excel/sheet/${id}`),
};

export default { RegisterUser };
