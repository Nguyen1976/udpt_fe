/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                'toast-message':
                    'slideInleft ease 1s, slideInRight linear 0.75s 3s forwards',
            },
            keyframes: {
                slideInleft: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(450px)',
                    },
                    '40%': {
                        transform: 'translateX(-10%)',
                    },
                    '80%': {
                        transform: 'translateX(0%)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0px)',
                    },
                },
                slideInRight: {
                    '0%': {
                        transform: 'translateX(0px)',
                    },
                    '40%': {
                        transform: 'translateX(1%)',
                    },
                    '80%': {
                        transform: 'translateX(-10%)',
                    },
                    '100%': {
                        transform: 'translateX(450px)',
                    },
                },
            },
        },
    },
    plugins: [],
};
