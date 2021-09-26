import { AUTH, LOGOUT, EDIT, REFRESH } from "../actions/ActionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({...action?.data}));

      return {...state, authData: action.data};
      break;
    case LOGOUT:
    
        localStorage.clear()
        return {...state, authData: null};

      return state;
      break;

    case EDIT:

      localStorage.clear()
      return {...state, authData: null};

    default:
      return state;
      break;
  }
};

export default authReducer;
