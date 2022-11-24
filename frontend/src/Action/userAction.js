import axios from "axios";
import {
  USER_FAIL,
  USER_REQUEST,
  USER_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/taskConstants";
import {URL} from '../constants/apiEndPoint'

export const userlogin = (payload) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: USER_REQUEST,
      });
      const response = await axios.request( {method: 'POST', url: `${URL}/api/v1/login`,  headers: {}, data: payload});
			localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      dispatch({
        type: USER_SUCCESS,
        payload: response?.data?.user,
      });
    } catch (error) {
      dispatch({
        type: USER_FAIL,
        payload: error?.response?.data,
      });
    }
  };
};

//clearing error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
