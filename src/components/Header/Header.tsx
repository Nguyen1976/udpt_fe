import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function Header() {
    const [isMenu, setIsMenu] = useState<boolean>(false);
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
                        alt=""
                    />
                </div>
                <p>Nguyên</p>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div
                className={`absolute top-20 bg-white text-black rounded-md shadow-lg w-32 ${
                    isMenu ? 'block' : 'hidden'
                }`}
            >
                <p className="p-2">Đăng xuất</p>
            </div>
        </div>
    );
}
