

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});
export const getBlogsByCategory = async (category_name) => {
  const response = await axios.get(`/api/blogs?category=${category_name}`); 
  return response;
};
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const fetchBlogs = (queryParams) => API.get('/blogs', { params: queryParams });
export const createBlog = (blogData) => API.post('/blogs', blogData);