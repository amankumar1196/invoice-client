import apiHandler from "../../utils/apiCaller";
import { qs } from "../../utils/helper";
import {
  CREATE_COMPANY,
  RETRIEVE_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  DELETE_ALL_COMPANIES
} from "./types";


export const createCompany = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/companies", data);

    dispatch({
      type: CREATE_COMPANY,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
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
    console.log(err);
  }
};

export const updateCompany = (id, data) => async (dispatch) => {
  try {
    const res = await apiHandler.put(`/tutorials/${id}`, data);

    dispatch({
      type: UPDATE_COMPANY,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
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

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const deleteAllCompanies = () => async (dispatch) => {
  try {
    const res = await apiHandler.delete(`/tutorials`);

    dispatch({
      type: DELETE_ALL_COMPANIES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findCompaniesByTitle = (title) => async (dispatch) => {
  try {
    const res = await apiHandler.get(`/tutorials?title=${title}`);

    dispatch({
      type: RETRIEVE_COMPANIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};