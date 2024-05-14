import axios from 'axios';

const BASE_URL: string = 'https://localhost:7298/';

export default axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});