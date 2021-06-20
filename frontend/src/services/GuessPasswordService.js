import axios from 'axios';
import { API_URL } from '../config';

const api  = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json',
})

const GuessPasswordService = {}

GuessPasswordService.createNewPassword = function() {
  return api.get('/new-password');
};

GuessPasswordService.verifyPassword = function(hint, answer) {
  const body = {
    hint, answer
  }
  return api.post('/verify-password', body);
};

export default GuessPasswordService;