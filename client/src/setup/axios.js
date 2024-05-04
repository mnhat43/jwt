import axios from "axios";
import { toast } from "react-toastify";
const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.defaults.withCredentials = true;

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

instance.interceptors.response.use(function (response) {

    return response.data;
}, function (error) {
    const status = error && error.response && error.response.status || 500;

    switch (status) {
        //Authentication (token related issues)
        case 401: {
            toast.error('Unauthorized the user. Please login...');
            // window.location.href = '/login';
            return error.response.data;
        }

        //Forbidden (permission related issues)
        case 403: {
            toast.error(`You dont't have the permission to access this resource`);
            return error.response.data;
        }

        default: {
            return error.response.data;
        }
    }
});

export default instance;