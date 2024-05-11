import axios from 'axios';

const BASE_URL: string = 'https://localhost:7298/';

export const agentNoCredentials = axios.create({
  withCredentials: false,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const agentWithCredentials = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});