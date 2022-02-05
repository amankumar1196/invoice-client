import apiHandler from "../../utils/apiCaller";
import { setToastr } from "./ToastrMessageActions";
import {
  CREATE_COMPANY,
  RETRIEVE_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  SET_COMPANY_EDITING
} from "./types";


export const createCompany = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("POST", "/v1/companies", filters, data);

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

export const retrieveCompanies = (filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", "/v1/companies", filters);
    
    dispatch({
      type: RETRIEVE_COMPANIES,
      payload: res.data,
    });
    
  } catch (err) {
    console.log(err);
    dispatch(setToastr(err.response.data, 'danger'));
  }
};

export const getCompany = (id, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", `/v1/companies/${id}`, filters);

    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
    return Promise.resolve(res.data);

  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const updateCompany = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("PUT", `/v1/companies/${data.id}`, filters, data);

    dispatch({
      type: UPDATE_COMPANY,
      payload: res.data,
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
    const res = await apiHandler("delete", `/v1/companies/${id}`);

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

export const companyEditing = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_COMPANY_EDITING,
      payload: {id},
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};
