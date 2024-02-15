import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.timeout = 1000;
axios.defaults.withCredentials = true;

export default axios;
