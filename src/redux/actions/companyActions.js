import apiHandler from "../../utils/apiCaller";
import { qs } from "../../utils/helper";
import { setToastr } from "./ToastrMessageActions";
import {
  CREATE_COMPANY,
  RETRIEVE_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
} from "./types";


export const createCompany = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/companies", data);

    dispatch({
      type: CREATE_COMPANY,
      payload: res.data,
    });

    dispatch(setToastr('Company Added Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const retrieveCompanies = (filter) => async (dispatch) => {
  try {
    let url = "/v1/companies" 
    let qst = true ? qs({userId: 1}) : "";
    url = url +"?"+qst;
    const res = await apiHandler.get(url);
    
    dispatch({
      type: RETRIEVE_COMPANIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const getCompany = (id) => async (dispatch) => {
  try {
    let url = `/v1/companies/${id}` 
    const res = await apiHandler.get(url);
    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const updateCompany = (id, data) => async (dispatch) => {
  try {
    const res = await apiHandler.put(`/companies/${id}`, data);

    dispatch({
      type: UPDATE_COMPANY,
      payload: data,
    });

    dispatch(setToastr('Company Updated Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    const res = await apiHandler.delete(`/v1/companies/${id}`);

    dispatch({
      type: DELETE_COMPANY,
      payload: res.data,
    });

    dispatch(setToastr('Company Removed Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};
