
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';




export const getPosts = async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
};

export const getComments = async () => {
  const response = await axios.get(`${BASE_URL}/comments`);
  return response.data;
};
export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};
