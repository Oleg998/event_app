import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://node-rest-api-bp9v.onrender.com',
});

export const registerUser = async body => {
  const { data } = await authInstance.post('/users/register/', body);
  return data;
};

export default authInstance;
