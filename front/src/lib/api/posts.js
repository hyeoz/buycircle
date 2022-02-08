import axios from 'axios';
import qs from 'qs';

const client = axios.create();

export const writePost = ({method, name, price, body, tags}) => client.post('/api/posts', {method, name, price, body, tags});
export const readPost = (id) => client.get(`/api/posts/${id}`);
export const listPosts = ({page, username, tag}) => {
  const queryString = qs.stringify({
    page,
    username, 
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({id, method, name, price, body, tags}) => client.patch(`/api/posts/${id}`, {
  method, name, price, body, tags,
});

export const removePost = (id) => client.delete(`/api/posts/${id}`);