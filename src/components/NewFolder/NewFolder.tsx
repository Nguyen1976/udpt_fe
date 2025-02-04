import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '~/context/LoadingContext';
import { useToast } from '~/context/ToastContext';
import { createFolder } from '~/services/FolderService';

interface NewFolderProps {
    setPopUp: (value: boolean) => void;
}

export default function NewFolder({ setPopUp }: NewFolderProps) {
    const [name, setName] = useState<string>('');
    const setLoading = useLoading();
    const { addToast } = useToast();

    const navigate = useNavigate();

    const handleClose = () => {
        setPopUp(false);
        setName('');
        navigate(-1);
    };

    const addFolder = async () => {
        try {
            setLoading(true);
            const userId = JSON.parse(localStorage.getItem('id') ?? 'null');
            await createFolder({ name, userId });
            handleClose();
            addToast('Thêm folder thành công', 'success');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center z-10">
            <div className="bg-white py-5 px-10 rounded-md shadow-md">
                <h1 className="font-bold text-center text-lg my-5">
                    New Folder
                </h1>
                <input
                    type="text"
                    placeholder="Nhập vào tên folder"
                    className="p-2 w-full border border-gray-300 rounded-md"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex justify-between gap-5 mt-5">
                    <button
                        className="outline outline-1 outline-[#101f20] bg-[#101f20] text-white py-2 px-4 hover:bg-transparent hover:text-black"
                        onClick={addFolder}
                    >
                        Thêm Folder
                    </button>
                    <button
                        className="outline outline-1 outline-[#101f20] bg-[#101f20] text-white py-2 px-4 hover:bg-transparent hover:text-black"
                        onClick={handleClose}
                    >
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    );
}
