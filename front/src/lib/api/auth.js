// 서버와 연결
import axios from 'axios';

const client = axios.create();

export const login = ({username, password}) => client.post('/api/auth/login', {username, password});
export const register = ({username, password}) => client.post('/api/auth/register', {username, password});
export const check = () => client.get('/api/auth/check');
export const logout = () => client.post('/api/auth/logout');