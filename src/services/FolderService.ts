import axios from 'axios';
import config from '~/configs';
const apiClient = axios.create({
    baseURL: config.envConfig.VITE_REACT_APP_API_FOLDER,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const getAllFolder = async (userId: string) => {
    const res = await apiClient.get(`/get-all/${userId}`);
    return res.data;
};

export const createFolder = async (data: unknown) => {
    const res = await apiClient.post(`/create`, data);
    return res.data;
};

export const deleteFolder = async (folderId: string) => {
    const res = await apiClient.delete(`/delete/${folderId}`);
    return res.data;
}