// import axios from "axios";

// const token = localStorage.getItem('access-token');

// const apiHandler = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-type": "application/json",
//     'x-access-token': token && token
//   }
// });

// export default apiHandler;


import axios from 'axios';
import qs from "qs";

const API_ROOT = "http://localhost:8080/api"

function apiHandler(method, endpointUrl, params, data = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-access-token': localStorage.getItem('access-token') || ''
  };
  let url = API_ROOT + endpointUrl;
  if(params)
    url = url + '?'+ qs.stringify(params, { arrayFormat: 'brackets' })
  else url = url
  
  if(data){
    return axios({
      method,
      url,
      data,
      headers
    });
  } else return axios({
    method,
    url,
    headers
  });
  
}

export default apiHandler;


// import axios from 'axios';
// import qs from 'qs';
// import { API_ROOT } from '../../env';

// const API_VERSION_ONE_ADMIN = 'admin/v1';
// const API_VERSION_ONE = 'v1';

// function handleAPI(path, params, method, data = null) {
//   const headers = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': localStorage.getItem('Access-Token') || localStorage.getItem('Pdf-Access-Token') || '',
//     'Suite-Name': process.env.REACT_APP_SUITE_NAME,
//     'Store-Id': localStorage.getItem('StoreID'),
//   };
//   let url = API_ROOT + path;
//   url = url +'?'+ qs.stringify(params, { arrayFormat: 'brackets' })
//   return axios({
//     method,
//     url,
//     data,
//     headers
//   });
// }

// export { handleAPI, API_VERSION_ONE_ADMIN, API_VERSION_ONE};