import React from 'react';
import { faLock, faSignature, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import config from '~/configs';
import { signUp } from '~/services/UserService';

interface IFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IFormInput>();
    const password = watch('password');

    const onSubmit = async (data: IFormInput) => {
        try {
            await signUp(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h3 className="mb-10 text-2xl text-white font-bold font-heading">
                Đăng ký tài khoản
            </h3>
            <div className="mb-3">
                <div className="flex items-center pl-6 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <FontAwesomeIcon icon={faSignature} />
                    </span>
                    <input
                        className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none"
                        type="name"
                        placeholder="Nhập vào tên"
                        {...register('name', {
                            required: 'Hãy nhập tên',
                            pattern: {
                                value: /^.{6,16}$/,
                                message:
                                    'Tên phải tối thiếu 6 kí tự và tối đa 16 kí tự',
                            },
                        })}
                    />
                </div>
                {errors.name && (
                    <p className="text-xs text-[#f1657c] ml-5 select-none mt-1">
                        {errors.name.message as string}
                    </p>
                )}
            </div>
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
            <div className="mb-6">
                <div className="flex items-center pl-6 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                        className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        {...register('confirmPassword', {
                            required: 'Hãy nhập lại mật khẩu',
                            validate: (value) =>
                                value === password || 'Mật khẩu không khớp',
                        })}
                    />
                </div>
                {errors.confirmPassword && (
                    <p className="text-xs text-[#f33a58] ml-2 select-none">
                        {errors.confirmPassword?.message as string}
                    </p>
                )}
            </div>
            <button className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200">
                Đăng ký
            </button>
            <p className="text-white text-center text-sm mt-5">
                Nếu bạn đã có tài khoản hãy{' '}
                <Link
                    to={config.routes.signIn}
                    className="underline text-blue-500"
                >
                    đăng nhập
                </Link>
            </p>
        </form>
    );
}
