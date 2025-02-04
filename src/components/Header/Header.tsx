import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { RootState } from '~/redux/store';
import { useNavigate } from 'react-router-dom';
import config from '~/configs';

export default function Header() {
    const [isMenu, setIsMenu] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('id');
        navigate(config.routes.signIn);
    }


    return (
        <div className="bg-[#1f2937] text-white flex justify-end items-center px-8 py-2 relative">
            <h1 className="text-center text-3xl mr-[40%]">Note App</h1>
            <div
                className="flex items-center gap-2 hover:bg-[#183052] p-2 rounded-lg"
                onClick={() => setIsMenu((prev) => !prev)}
            >
                <div className="rounded-full overflow-hidden w-10 h-10">
                    <img
                        src="https://res.cloudinary.com/dcnfkcsln/image/upload/v1734621353/user/chbdn24p1zuyfyxmsogk.png"
                        alt="User Avatar"
                    />
                </div>
                <p>{user.name}</p>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div
                className={clsx(
                    'absolute top-20 bg-white text-black rounded-md shadow-lg w-32',
                    { block: isMenu, hidden: !isMenu }
                )}
                onClick={handleLogout}
            >
                <p className="p-2">Đăng xuất</p>
            </div>
        </div>
    );
}
