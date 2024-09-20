import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://node-rest-api-bp9v.onrender.com',
});



export default authInstance;
