import * as api from "../api";
import { FETCH, CREATE, UPDATE, DELETE } from './ActionTypes'


export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    post.lingDate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", " + new Date().toLocaleDateString()

    const { data } = await api.createPost(post);

    console.log(post)
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);


    console.log("action ", id, post )

    
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id})
  } catch (error) {
    console.log(error);
  }
};