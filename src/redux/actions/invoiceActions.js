import apiHandler from "../../utils/apiCaller";

import {
  CREATE_INVOICE,
  RETRIEVE_INVOICES,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  DELETE_ALL_INVOICES
} from "./types";


export const createInvoice = (data) => async (dispatch) => {
  try {
    const res = await apiHandler.post("/v1/invoices", data);

    dispatch({
      type: CREATE_INVOICE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveInvoices = () => async (dispatch) => {
  try {
    const res = await apiHandler.get("/v1/invoices");
    
    dispatch({
      type: RETRIEVE_INVOICES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateInvoice = (id, data) => async (dispatch) => {
  try {
    const res = await apiHandler.put(`/tutorials/${id}`, data);

    dispatch({
      type: UPDATE_INVOICE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteInvoice = (id) => async (dispatch) => {
  try {
    const res = await apiHandler.delete(`/tutorials/${id}`);

    dispatch({
      type: DELETE_INVOICE,
      payload: { id },
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const deleteAllInvoices = () => async (dispatch) => {
  try {
    const res = await apiHandler.delete(`/tutorials`);

    dispatch({
      type: DELETE_ALL_INVOICES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findInvoicesByTitle = (title) => async (dispatch) => {
  try {
    const res = await apiHandler.get(`/tutorials?title=${title}`);

    dispatch({
      type: RETRIEVE_INVOICES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};