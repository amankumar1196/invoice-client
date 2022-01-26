import apiHandler from "../../utils/apiCaller";
import { setToastr } from "./ToastrMessageActions";

import {
  ONBOARDING
} from "./types";


export const createOnboarding = (data, filters) => async (dispatch) => {
  try {
    const res = await apiHandler("post", "/v1/onboarding", filters, data);

    dispatch({
      type: ONBOARDING,
      payload: res.data,
    });

    dispatch(setToastr("Account Setuped Successfully", "success"))
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch(setToastr(err.response.message, "danger"))
    return Promise.reject(err);
  }
};
