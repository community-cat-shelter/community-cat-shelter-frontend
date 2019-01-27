import axios from 'axios';

export const getCatFlat = (limit) => {
  const queryParams = limit ? `?limit=${limit}` : ''
  return axios.get(`http://localhost:5000/catData${queryParams}`);
};
