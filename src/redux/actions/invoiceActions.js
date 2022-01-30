import apiHandler from "../../utils/apiCaller";
import { setToastr } from "./ToastrMessageActions";

import {
  CREATE_INVOICE,
  RETRIEVE_INVOICES,
  GET_INVOICE,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  DELETE_ALL_INVOICES,
  RETRIEVE_INVOICES_IDS,
  SET_INVOICE_EDITING
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

// export const deleteInvoice = (id) => async (dispatch) => {
//   try {
//     const res = await apiHandler.delete(`/tutorials/${id}`);

//     dispatch({
//       type: DELETE_INVOICE,
//       payload: { id },
//     });

//     return Promise.resolve(res.data);
//   } catch (err) {
//     console.log(err);
//     return Promise.reject(err);
//   }
// };

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
