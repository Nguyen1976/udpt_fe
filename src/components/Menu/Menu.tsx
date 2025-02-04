import { useEffect, useState } from 'react';
import FolderItem from './FolderItem';
import { getAllFolder } from '~/services/FolderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import NewFolder from '~/components/NewFolder';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState<boolean>(false);
    const id = JSON.parse(localStorage.getItem('id') ?? 'null');
    const [listFolder, setListFolder] = useState<
        { name: string; id: string }[]
    >([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const popupName = searchParams.get('popup');

    const content = useSelector((state: RootState) => state.note.content);
    useEffect(() => {
        const fetchFolder = async () => {
            try {
                const response = await getAllFolder(id);
                if (response.folders) {
                    setListFolder(response.folders);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchFolder();
    }, [popupName, reload]);
    const handleOpenPopup = () => {
        setSearchParams({ popup: 'add-folder' });
    };

    useEffect(() => {
        if (popupName === 'add-folder') {
            setOpen(true);
            return;
        }
        setOpen(false);
    }, [popupName]);

    return (
        <div className="mt-12 max-w-[280px] mx-auto bg-slate-200 p-2 rounded-md" key={content}>
            <div className="mx-2 border-b-[1px] border-slate-500 pb-2 flex items-center justify-between text-2xl">
                <h1 className="font-bold ">Folder</h1>
                <FontAwesomeIcon
                    onClick={handleOpenPopup}
                    icon={faFolderPlus}
                />
            </div>
            <ul className="flex flex-col gap-2">
                {listFolder.map(
                    (folder: { name: string; id: string }, index: number) => (
                        <li key={index}>
                            <FolderItem
                                setReload={setReload}
                                name={folder.name}
                                id={folder.id}
                            />
                        </li>
                    )
                )}
            </ul>
            {open && <NewFolder setPopUp={setOpen} />}
        </div>
    );
}
