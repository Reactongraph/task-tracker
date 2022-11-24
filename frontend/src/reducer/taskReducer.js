import {
  ALL_TASK_FAIL,
  ALL_TASK_SUCCESS,
  ALL_TASK_REQUEST,
  CLEAR_ERRORS,
  DASHBORAD_SUCCESS,
  DASHBORAD_REQUEST,
  TASK_DELETE_SUCCESS,
  EDIT_TASK_SUCCESS,
  CREATE_TASK_SUCCESS,
  SEARCH_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS
} from "../constants/taskConstants";

export const taskReducer = (
  state = { tasks: [], dashboardData: [] },
  action
) => {
  switch (action.type) {
    case ALL_TASK_REQUEST:
      return {
        loading: true,
        tasks: [],
      };

    case ALL_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };

    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DASHBORAD_REQUEST:
      return {
        loading: true,
        dashboardData: [],
      };

    case DASHBORAD_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboardData: action.payload,
      };

      case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboardData: action.payload,
      };

      case CREATE_TASK_SUCCESS:
        const data = [...state.tasks.alltask, action.payload.task];
        state.tasks.alltask = data;
        return {
          ...state,
          loading: false,
        };

      case SEARCH_TASK_SUCCESS:
        return {
          ...state,
          loading: false,
          tasks: action.payload,
        };

    case EDIT_TASK_SUCCESS:
      const stateval=[...(state.tasks.alltask||[])]
      const index = stateval.findIndex((item)=> item._id === action.payload.updateTask._id)
      stateval[index]=action.payload.updateTask
      state.tasks.alltask = stateval
      return {
        ...state,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
