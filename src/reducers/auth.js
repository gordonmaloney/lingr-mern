import {
  AUTH,
  LOGOUT,
  EDIT,
  UPDATEUSER,
} from "../actions/ActionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data };
      break;

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
      break;

    case EDIT:
      localStorage.clear();
      localStorage.setItem("profile", JSON.stringify({ ...action?.data2 }));
      return { ...state, authData: null };


    case UPDATEUSER:

      localStorage.clear();
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return { ...state, authData: action.payload };
      break; 

    default:
      return state;
      break;
  }
};

export default authReducer;