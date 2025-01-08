import config from '~/configs';
import AuthLayout from '~/layouts/AuthLayout';
import DefaultLayout from '~/layouts/DefaultLayout';
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

export const publicRoutes = [
    {
        path: config.routes.home,
        element: Home,
        layout: DefaultLayout,
    },
    {
        path: config.routes.signIn,
        element: SignIn,
        layout: AuthLayout,
    },
    {
        path: config.routes.signUp,
        element: SignUp,
        layout: AuthLayout,
    },
];
