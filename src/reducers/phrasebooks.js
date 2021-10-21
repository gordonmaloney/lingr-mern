import { GETPHRASEBOOKS, CREATEPHRASEBOOK, DELETEPHRASEBOOK, ADDWORD, EDITWORD, DELETEWORD  } from '../actions/ActionTypes'


export default (phrasebooks = [], action) => {
  switch (action.type) {
    case GETPHRASEBOOKS:
      return action.payload;

    case CREATEPHRASEBOOK:
      return [...phrasebooks, action.payload];

    case ADDWORD: 
    return phrasebooks.map((phrasebook) =>
      phrasebook._id === action.payload._id ? action.payload : phrasebook);


    case DELETEWORD:
        return phrasebooks.map((phrasebook) =>
        phrasebook._id === action.payload._id ? action.payload : phrasebook);

    case EDITWORD:
        return phrasebooks.map((phrasebook) =>
        phrasebook._id === action.payload._id ? action.payload : phrasebook);


            /*
    case UPDATE:
      return posts.map((post) =>
      post._id === action.payload._id ? action.payload : post);

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
      */
    default:
      return phrasebooks;
  }
};
