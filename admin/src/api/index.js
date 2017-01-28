import Axios from 'axios'
//Axios.defaults.baseURL = process.env.api;
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default Axios
