import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
//Hosting Error 👽
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
  get: (url) => axios.get(url).then(sleep(3000)).then(responseBody),
  getSecured: (url) =>
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then(sleep(1000))
      .then(responseBody),
  postSecured: (url, body) =>
    axios
      .post(url, body, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then(sleep(3000))
      .then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(3000)).then(responseBody),
  formUrlPost: (url, file) => {
    let formData = new FormData();
    formData.append("file", file);
    return axios
      .post(url, formData, FormDataConfig)
      .then(sleep(8000))
      .then(responseBody);
  },
  put: (url, body) =>
    axios
      .put(url, body, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then(sleep(3000))
      .then(responseBody),
};

export const Auth = {
  login: (loginCredential) => requests.post(`/auth/signin`, loginCredential),
  loadUser: () =>
    requests.getSecured(`/auth/extractuser/${localStorage.token}`),
};

export const AdminDashboard = {
  fetchUsers: (url) => requests.getSecured("/user/all"),
  uploadSheetData: (sheetCode, sheetName) =>
    requests.postSecured("/meta/create", { sheetCode, sheetName }),
  uploadSheet: (id, file) => {
    id = parseInt(id);
    return requests.formUrlPost(`/excel/upload/${id}`, file);
  },
  updateUser: (updatedUser, id) =>
    requests.put(`/user/update/${id}`, updatedUser),
  setNewSheet: (newSheetData) =>
    requests.postSecured(`/meta/create`, newSheetData),
  createUser: (values) => requests.postSecured("/auth/signup", values),
  fetchSheetsMeta: () => requests.getSecured("/meta/sheet"),
};

export const Sheet = {
  fetchSheetsMeta: () => requests.getSecured("/meta/sheet"),
  fetchSheetById: (id) => requests.getSecured(`excel/sheets/${id}`),
};
