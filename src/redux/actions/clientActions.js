import apiHandler from "../../utils/apiCaller";
import { qs } from "../../utils/helper";
import { setToastr } from "./ToastrMessageActions";
import {
  CREATE_CLIENT,
  RETRIEVE_CLIENTS,
  GET_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  SET_CLIENT_EDITING
} from "./types";


export const createClient = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("POST", "/v1/clients", filters, data);

    dispatch({
      type: CREATE_CLIENT,
      payload: res.data,
    });
    dispatch(setToastr('Client Added Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const retrieveClients = (filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", "/v1/clients", filters);
    
    dispatch({
      type: RETRIEVE_CLIENTS,
      payload: res.data,
    });
    
  } catch (err) {
    console.log(err);
    dispatch(setToastr(err.response.data, 'danger'));
  }
};

export const getClient = (id, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", `/v1/clients/${id}`, filters);

    dispatch({
      type: GET_CLIENT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const updateClient = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("PUT", `/v1/clients/${data.id}`, filters, data);


    dispatch({
      type: UPDATE_CLIENT,
      payload: res.data,
    });

    dispatch(setToastr('Client Updated Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const deleteClient = (id) => async (dispatch) => {
  try {
    const res = await apiHandler("delete", `/v1/clients/${id}`);

    dispatch({
      type: DELETE_CLIENT,
      payload: res.data,
    });

    dispatch(setToastr('Client Removed Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const clientEditing = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_CLIENT_EDITING,
      payload: {id},
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};
