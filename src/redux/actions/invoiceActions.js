import axios from "axios";
import apiHandler from "../../utils/apiCaller";
import { downloadFile } from "../../utils/helper";
import { setToastr } from "./ToastrMessageActions";

import {
  CREATE_INVOICE,
  RETRIEVE_INVOICES,
  GET_INVOICE,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  DELETE_ALL_INVOICES,
  RETRIEVE_INVOICES_IDS,
  SET_INVOICE_EDITING,
  SET_INVOICE_PREVIEW,
  GENERATE_PDF
} from "./types";


export const createInvoice = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("post", "/v1/invoices", filters, data);

    dispatch({
      type: CREATE_INVOICE,
      payload: res.data,
    });

    dispatch(setToastr("Invoice Created Successfully", "success"))
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.message, "danger"))
    return Promise.reject(err);
  }
};

export const retrieveInvoices = (filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", "/v1/invoices", filters);
    
    dispatch({
      type: RETRIEVE_INVOICES,
      payload: res.data,
    });    
  } catch (err) {
    dispatch(setToastr(err.message, "danger"))
    console.log(err);
  }
};

export const getInvoice = (id, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", `/v1/invoices/${id}`, filters);

    dispatch({
      type: GET_INVOICE,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const updateInvoice = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("put", `/v1/invoices/${data.id}`, filters, data);

    dispatch({
      type: UPDATE_INVOICE,
      payload: res.data,
    });

    dispatch(setToastr("Invoice Updated Successfully", "success"))
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.message, "danger"))
    return Promise.reject(err);
  }
};

export const deleteInvoice = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("delete", `/v1/invoices/${data.id}`, filters, data);

    dispatch({
      type: UPDATE_INVOICE,
      payload: res.data,
    });

    dispatch(setToastr(`Invoice ${data.archived ? "Archived" : "Restored"} Successfully`, "success"))
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.message, "danger"))
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

export const getAllInvoicesIds = (filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", "/v1/invoices/ids", filters);
    
    dispatch({
      type: RETRIEVE_INVOICES_IDS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};

export const invoiceEditing = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_INVOICE_EDITING,
      payload: {id},
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const showInvoicePreview = (val) => async (dispatch) => {
  try {
    dispatch({
      type: SET_INVOICE_PREVIEW,
      payload: {show: val},
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const generatePdf = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("post", "/v1/invoices/generate-invoice-pdf", filters, {data: {...data}}, data.type !== "view" && { responseType: 'blob' });
    downloadFile(res, data.type)
      
    dispatch({
      type: GENERATE_PDF,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const downloadInvoicePDF = (id, filters) => async (dispatch) => {
  try {
    dispatch(setToastr(`Downlad will start soon`, "info"))
    const res = await apiHandler("get", `/v1/invoices/${id}/download-pdf`, filters, null, { responseType: 'blob' });
    downloadFile(res, "download")
    
    // // dispatch({
    // //   type: DOWNLAOD_PDF,
    // //   payload: res.data,
    // // });

  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};
