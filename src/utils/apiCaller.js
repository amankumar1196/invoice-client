import axios from "axios";

const token = localStorage.getItem('access-token');

const apiHandler = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    'x-access-token': token && token
  }
});

export default apiHandler;