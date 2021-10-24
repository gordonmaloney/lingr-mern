import * as api from "../api";
import { AUTH, DELETE, UPDATEUSER } from "./ActionTypes";

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

//REPLACED WITH UPDATE BELOW
export const editProfile = (formData, history) => async (dispatch) => {
  try {

    const { data2 } = await api.editProfile(formData)
    const { data } = await api.signUp(formData)

    await dispatch({ type: DELETE, data2 });

    await dispatch({ type: AUTH, data });

    history.push("/");

  } catch (error) {
    console.log(error);
  }
};


export const updateUser = (id, post, history) => async (dispatch) => {
  try {

    post.persistentId = "deprecated"

    const { data } = await api.updateUser(id, post);
    
    console.log(data)

    dispatch({ type: UPDATEUSER, payload: data });

    history.push("/");

  } catch (error) {
    console.log("update user error", error);
  }
};