import axios from 'axios';
import config from '~/configs';
const apiClient = axios.create({
    baseURL: config.envConfig.VITE_REACT_APP_API_USER,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        // Lấy access_token từ localStorage
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            // Thêm access_token vào header Authorization
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        // Nếu yêu cầu thành công, trả về phản hồi như bình thường
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra lỗi 403 (Access Token hết hạn)
        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                // const data = await refreshToken();
                // localStorage.setItem('accessToken', data.access_token);

                // Cập nhật lại header với access token mới
                // originalRequest.headers['Authorization'] =
                //     `Bearer ${data.access_token}`;

                return axios(originalRequest);
            } catch (err) {
                console.error('Error refreshing token:', err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

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
    const res = await apiClient.post('/user/sign-up', data);
    return res.data;
};

export const signIn = async (data: SignInData) => {
    const res = await apiClient.post('/user/sign-in', data);
    return res.data;
};
