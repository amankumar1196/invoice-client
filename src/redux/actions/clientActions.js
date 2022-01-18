import apiHandler from "../../utils/apiCaller";
import { qs } from "../../utils/helper";
import {
  CREATE_CLIENT,
  RETRIEVE_CLIENTS,
  GET_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  DELETE_ALL_CLIENTS
} from "./types";


export const createClient = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/clients", data);

    dispatch({
      type: CREATE_CLIENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveClients = (filter) => async (dispatch) => {
  try {
    let url = "/v1/clients" 
    let qst = true ? qs({userId: 1}) : "";
    url = url +"?"+qst;
    const res = await apiHandler.get(url);
    
    dispatch({
      type: RETRIEVE_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getClient = (id) => async (dispatch) => {
  try {
    let url = `/v1/clients/${id}` 
    const res = await apiHandler.get(url);
    dispatch({
      type: GET_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateClient = (id, data) => async (dispatch) => {
  try {
    const res = await apiHandler.put(`/tutorials/${id}`, data);

    dispatch({
      type: UPDATE_CLIENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteClient = (id) => async (dispatch) => {
  try {
    const res = await apiHandler.delete(`/v1/clients/${id}`);

    dispatch({
      type: DELETE_CLIENT,
      payload: { id: res.id },
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const deleteAllClients = () => async (dispatch) => {
  try {
    const res = await apiHandler.delete(`/tutorials`);

    dispatch({
      type: DELETE_ALL_CLIENTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findClientsByTitle = (title) => async (dispatch) => {
  try {
    const res = await apiHandler.get(`/tutorials?title=${title}`);

    dispatch({
      type: RETRIEVE_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};