import axios from 'axios';
import {
  ALL_TASK_FAIL,
  ALL_TASK_SUCCESS,
  CLEAR_ERRORS,
  DASHBORAD_SUCCESS,
  DASHBORAD_REQUEST,
  TASK_DELETE_SUCCESS,
  EDIT_TASK_SUCCESS,
  CREATE_TASK_SUCCESS,
  SEARCH_TASK_SUCCESS,
} from '../constants/taskConstants';
import {URL} from '../constants/apiEndPoint'

export const getAllTasks = () => {
    return async function (dispatch) {
      try {
        dispatch({
          type: DASHBORAD_REQUEST,
        });
        const response = await axios.request({method: 'GET', url: `${URL}/api/v1/tasks`});
        dispatch({
          type: ALL_TASK_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: ALL_TASK_FAIL,
          payload: error.response.data.message,
        });
      }
    };
  };
  export const deleteTask = (id) => {
    return async function (dispatch) {
      try {
        const response = await axios.request({method: 'DELETE', url: `${URL}/api/v1/tasks/${id}`});
        dispatch({
          type: TASK_DELETE_SUCCESS,
          payload: response.data,
        });

        dispatch(getAllTasks());
        dispatch(dashboardTask());
        
      } catch (error) {
        dispatch({
          type: ALL_TASK_FAIL,
          payload: error.response.data.message,
        });
      }
    };
  };

  export const editTask = (data) => {
    return async function (dispatch) {
      try {
        const response = await axios.request({method: 'PUT', url: `${URL}/api/v1/tasks/${data.id}`,  headers: {}, data: {
          task: data.message,
          status: data.status
        }});
        dispatch({
          type: EDIT_TASK_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: ALL_TASK_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };
  };

  export const createTask = (data) => {
    return async function (dispatch) {
      try {
        const response = await axios.request({method: 'POST', url: `${URL}/api/v1/tasks`,  headers: {}, data: {
          task: data.task,
          userId: data.id
        }});
        dispatch({
          type: CREATE_TASK_SUCCESS,
          payload: response.data,
        });
        dispatch(getAllTasks())
        dispatch(dashboardTask());
      } catch (error) {
        dispatch({
          type: ALL_TASK_FAIL,
          payload: error?.response?.data,
        });
      }
    };
  };

  export const searchTask = (data) => {
    return async function (dispatch) {
      try {
        const response = await axios.request({method: 'POST', url: `${URL}/api/v1/tasks?key=${data.task}`,  headers: {}, data: {
          task: data.task,
          userId: data.id
        }});
        dispatch({
          type: SEARCH_TASK_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: ALL_TASK_FAIL,
          payload: error.response.data.message,
        });
      }
    };
  };

  export const dashboardTask = () => {
    return async function (dispatch) {
      try {
        dispatch({
          type: DASHBORAD_REQUEST,
        });

        const response = await axios.request({method: 'GET', url: `${URL}/api/v1/dashboard`});
        dispatch({
          type: DASHBORAD_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: ALL_TASK_FAIL,
          payload: error?.response?.data,
        });
      }
    };
  };
//clearing error
export const clearErrors = () => async(dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	})
}