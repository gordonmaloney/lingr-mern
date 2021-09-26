import * as api from "../api";
import { AUTH, DELETE } from "./ActionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: AUTH, data })

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)
    
    dispatch({ type: AUTH, data })

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};


export const editProfile = (formData, history) => async (dispatch) => {
  try {

    const { data2 } = await api.editProfile(formData)
    const { data } = await api.signUp(formData)

    await dispatch({ type: DELETE, data2 });

    await dispatch({ type: AUTH, data });

    history.push("/profile");

  } catch (error) {
    console.log(error);
  }
};
