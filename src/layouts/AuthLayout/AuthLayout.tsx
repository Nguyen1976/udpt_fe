import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div>
            <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden h-screen">
                <div className="relative container px-4 mx-auto">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap items-center -mx-4">
                            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                                <div className="max-w-md">
                                    <span className="text-lg text-blue-400 font-bold">
                                        Đăng ký
                                    </span>
                                    <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-white">
                                        Bắt đầu ghi chú của bạn bằng cách tạo
                                        tài khoản
                                    </h2>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 px-4">
                                <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AuthLayout;
