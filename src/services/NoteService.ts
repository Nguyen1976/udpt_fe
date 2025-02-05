import axios from 'axios';
import config from '~/configs';
const apiClient = axios.create({
    baseURL: config.envConfig.VITE_REACT_APP_API_NOTE,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const getAllNote = async (folderId: string) => {
    const res = await apiClient.get(`/get-all/${folderId}`);
    return res.data;
};

export const updateNote = async (data: unknown) => {
    const res = await apiClient.put(`/update`, data);
    return res.data;
};

export const deleteNote = async (noteId: string) => {
    const res = await apiClient.delete(`/delete/${noteId}`);
    return res.data;
}

export const createNote = async (data: unknown) => {
    const res = await apiClient.post(`/create`, data);
    return res.data;
}

export const getNote = async (id: string) => {
    const res = await apiClient.get(`/get/${id}`);
    return res.data;
}