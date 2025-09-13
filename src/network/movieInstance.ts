import axios from 'axios';
import config from '../utils/config';

const movieInstance = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: config.API_BEARER_TOKEN,
  },
    params: {
    api_key: config.API_KEY,
  },
});

export default movieInstance;
