import { z } from 'zod';

export const configSchema = z.object({
    VITE_REACT_APP_API_USER: z
        .string()
        .nonempty('VITE_REACT_APP_API_USER is required'),
});

const configProject = configSchema.safeParse({
    VITE_REACT_APP_API_USER: import.meta.env.VITE_REACT_APP_API_USER,
});

if (!configProject.success) {
    throw new Error('Giá trị khai bao trong file .env không hợp lệ');
}

const envConfig = configProject.data;

export default envConfig;
