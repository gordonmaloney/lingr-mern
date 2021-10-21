import * as api from "../api";
import { GETPHRASEBOOKS, CREATEPHRASEBOOK, DELETEPHRASEBOOK, ADDWORD, EDITWORD, DELETEWORD  } from './ActionTypes'


export const getPhrasebooks = () => async (dispatch) => {
  try {
    const { data } = await api.getPhrasebooks();

    dispatch({ type: GETPHRASEBOOKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const createPhrasebook = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPhrasebook(post);

    dispatch({ type: CREATEPHRASEBOOK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addWord = (id, newWord) => async (dispatch) => {
    try {
        console.log(id, newWord)

        const { data } = await api.addWord(id, newWord);

        dispatch({ type: ADDWORD, payload: data })
    } catch (error) {
        console.log(error)
    }
}


export const deleteWord = (id, wordId) => async (dispatch) => {
    try {
      const { data } = await api.deleteWord(id, wordId);
  
      dispatch({ type: DELETEWORD, payload: data });
      
    } catch (error) {
      console.log(error);
    }
  };


  export const editWord = (id, wordId, newWord) => async (dispatch) => {
    try {
      const { data } = await api.editWord(id, wordId, newWord);
  
      dispatch({ type: EDITWORD, payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };



/*

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id})
  } catch (error) {
    console.log(error);
  }
};




//not tested
export const updateComment = (id, commentId, post) => async (dispatch) => {
  try {
    const { data } = await api.updateComment(id, commentId, post);

    dispatch({ type: UPDATE, payload: data });

  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(id, commentId);

    dispatch({ type: UPDATE, payload: data });
    
  } catch (error) {
    console.log(error);
  }
};

*/