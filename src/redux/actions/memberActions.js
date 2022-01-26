import apiHandler from "../../utils/apiCaller";
import { qs } from "../../utils/helper";
import { setToastr } from "./ToastrMessageActions";
import {
  CREATE_MEMBER,
  RETRIEVE_MEMBERS,
  GET_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER,
  SET_MEMBER_EDITING
} from "./types";

export const createMember = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("POST", "/v1/members", filters, data);

    dispatch({
      type: CREATE_MEMBER,
      payload: res.data,
    });
    dispatch(setToastr('Member Added Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const retrieveMembers = (filters) => async (dispatch) => {
  try {

    const res = await apiHandler("GET", "/v1/members", filters);

    dispatch({
      type: RETRIEVE_MEMBERS,
      payload: res.data,
    });
    
  } catch (err) {
    console.log(err);
    dispatch(setToastr(err.response.data, 'danger'));
  }
};

export const getMember = (id, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("GET", `/v1/members/${id}`, filters);

    dispatch({
      type: GET_MEMBER,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};

export const updateMember = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("PUT", `/v1/members/${data.id}`, filters, data);


    dispatch({
      type: UPDATE_MEMBER,
      payload: res.data,
    });

    dispatch(setToastr('Member Updated Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const deleteMember = (id) => async (dispatch) => {
  try {
    const res = await apiHandler("delete", `/v1/members/${id}`);

    dispatch({
      type: DELETE_MEMBER,
      payload: res.data,
    });

    dispatch(setToastr('Member Removed Successfully', 'success'));

    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
    dispatch(setToastr(err.response.data, 'danger'));
    return Promise.reject(err);
  }
};

export const memberEditing = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MEMBER_EDITING,
      payload: {id},
    });
  } catch (err) {
    dispatch(setToastr(err.response.data, 'danger'));
    console.log(err);
  }
};
