import { TagFacesSharp } from '@material-ui/icons';
import axios from 'axios';
import { Post, Tag, User, UserFormValues } from '../types/main';
import { dateISO, summary } from '../utils/utils';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt !== null) {
    const userObj = JSON.parse(jwt);
    const token = userObj.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  } else {
    console.log('Invalid request');
    return config;
  }
});

export const getPosts = async () => {
  return await axios.get('/posts');
};

export const getPostsByAuthor = async (author: string) => {
  return await axios.get(`/posts/author/${author}`);
};

export const createNewPost = (title: string, body: string, author: string, tags: Tag[]) => {
  return axios.post('/posts', {
    title: title,
    summary: summary(body),
    body: body,
    author: author,
    date: dateISO,
    tags: tags,
  });
};

export const editPost = (title: string, body: string, id: number) => {
  return axios.put(`/posts/${id}`, {
    title: title,
    summary: body,
    body: body,
  });
};

export const deletePost = async (id: number) => {
  await axios({ url: `/posts/${id}`, method: 'delete' });
};

export const getCurrentUser = async (): Promise<User> => {
  return await axios.get('/account');
};

export const login = async (user: UserFormValues) => {
  return await axios.post('/account/login', {
    email: user.email,
    password: user.password,
  });
};

export const register = async (user: UserFormValues) => {
  return await axios.post('/account/register');
};

export const getTagsBySearch = (searchString: string) => {
  return axios.get(`/tags/search/${searchString}`);
};

export const createNewTag = async (newTag: string) => {
  return await axios.post('/tags', {
    tagName: newTag,
  });
};
