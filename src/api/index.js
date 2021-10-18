import axios from 'axios';


//const url = 'https://lingr-app.herokuapp.com/potlucks';

//const API = axios.create({baseURL: 'https://lingr-app.herokuapp.com' });
const API = axios.create({baseURL: 'http://localhost:5000' });


export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)

export const updateComment = (id, commentId, updatedComment) => API.patch(`/posts/${id}/${commentId}`, updatedComment)
export const deleteComment = (id, commentId) => API.delete(`/posts/${id}/${commentId}`)

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const editProfile = (formData) => API.post('/users/edit', formData)

export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser)