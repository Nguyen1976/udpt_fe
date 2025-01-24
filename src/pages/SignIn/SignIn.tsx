import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/configs';
import { useLoading } from '~/context/LoadingContext';
import { updateUser } from '~/redux/userSlice';
import { signIn } from '~/services/UserService';

interface IFormInput {
    email: string;
    password: string;
}

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>();

    const navigate = useNavigate();

    const setLoading = useLoading();

    const dispatch = useDispatch();

    const onSubmit = async (data: IFormInput) => {
        try {
            setLoading(true);
            const response = await signIn(data);
            if (response && response.user) {
                const { id, name, email } = response.user;
                dispatch(updateUser({ id, name, email }));
                localStorage.setItem('id', JSON.stringify(id));
                navigate(config.routes.home);
            } else {
                console.error(
                    'User data is missing from the response:',
                    response
                );
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mb-10 text-2xl text-white font-bold font-heading">
                Đăng nhập
            </h3>
            <div className="mb-3">
                <div className="flex items-center pl-6 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                        className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none"
                        type="email"
                        placeholder="Nhập vào email"
                        {...register('email', {
                            required: 'Hãy nhập email',
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: 'Địa chỉ email không hợp lệ',
                            },
                        })}
                    />
                </div>
                {errors.email && (
                    <p className="text-xs text-[#f1657c] ml-5 select-none mt-1">
                        {errors.email.message as string}
                    </p>
                )}
            </div>
            <div className="mb-3">
                <div className="flex items-center pl-6 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                        className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none"
                        type="password"
                        placeholder="Mật khẩu"
                        {...register('password', {
                            required: 'Hãy nhập mật khẩu',
                            pattern: {
                                value: /^.{6,16}$/,
                                message: 'Mật khẩu không hợp lệ',
                            },
                        })}
                    />
                </div>
                {errors.password && (
                    <p className="text-xs text-[#f33a58] ml-2 select-none">
                        {errors.password?.message as string}
                    </p>
                )}
            </div>

            <button className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200">
                Đăng nhập
            </button>
            <p className="text-white text-center text-sm mt-5">
                Nếu bạn chưa có tài khoản hãy{' '}
                <Link
                    to={config.routes.signUp}
                    className="underline text-blue-500"
                >
                    đăng ký
                </Link>
            </p>
        </form>
    );
}
