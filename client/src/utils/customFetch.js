import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // substitua pela URL da sua API
});

export default customFetch;
