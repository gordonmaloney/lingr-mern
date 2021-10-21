import { combineReducers } from "redux";

import posts from './posts';
import auth from './auth';
import phrasebooks from "./phrasebooks";

export default combineReducers({
    posts, auth, phrasebooks
});