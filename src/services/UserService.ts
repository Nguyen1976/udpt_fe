import axios from 'axios';
import config from '~/configs';
const apiClient = axios.create({
    baseURL: config.envConfig.VITE_REACT_APP_API_USER,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface SignInData {
    email: string;
    password: string;
}

export const signUp = async (data: SignUpData) => {
    const res = await apiClient.post('/sign-up', data);
    return res.data;
};

export const signIn = async (data: SignInData) => {
    const res = await apiClient.post('/sign-in', data);
    return res.data;
};

export const getDetailUser = async (id: string) => {
    const res = await apiClient.get(`/get-detail/${id}`);
    return res.data;
};
