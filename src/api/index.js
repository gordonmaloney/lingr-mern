import axios from 'axios';


//const url = 'https://lingr-app.herokuapp.com/potlucks';

//const API = axios.create({baseURL: 'https://lingr-app.herokuapp.com' });
const API = axios.create({baseURL: 'https://lingr-server.onrender.com'})
//const API = axios.create({baseURL: 'http://localhost:5000' });

//comments
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const updateComment = (id, commentId, updatedComment) => API.patch(`/posts/${id}/${commentId}`, updatedComment)
export const deleteComment = (id, commentId) => API.delete(`/posts/${id}/${commentId}`)


//auth
export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const editProfile = (formData) => API.post('/users/edit', formData)

export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser)


//phrasebooks
export const getPhrasebooks = () => API.get('/phrasebooks');
export const createPhrasebook = (newPhrasebook) => API.post('/phrasebooks', newPhrasebook)
export const deletePhrasebook = (id) => API.delete(`/phrasebooks/${id}`)

export const addWord = (id, newWord) => API.post(`/phrasebooks/${id}`, newWord)
export const editWord = (id, wordId, newWord) => API.patch(`/phrasebooks/${id}/${wordId}`, newWord)
export const deleteWord = (id, wordId) => API.delete(`/phrasebooks/${id}/${wordId}`)