import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://node-rest-api-bp9v.onrender.com',
});

export const registerUser = async body => {
  const { data } = await authInstance.post('/users/register/', body);
  return data;
};


export const getUserByEvent = async (id) => {
  const { data } = await authInstance.get(`/users/${id}`);
  console.log(id);
  
 
  
  return data;
};

export default authInstance;
