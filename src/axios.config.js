import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.timeout = 1000;
axios.defaults.withCredentials = true;

export default axios;
