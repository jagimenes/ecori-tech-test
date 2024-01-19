import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const baseURL = isProduction
  ? 'https://ecori-tech-test.onrender.com'
  : 'http://localhost:5000/api/v1';

const customFetch = axios.create({
  baseURL,
});

export default customFetch;
