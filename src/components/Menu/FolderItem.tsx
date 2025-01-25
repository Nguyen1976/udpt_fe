import {
    faFolder,
    faPlus,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { createNote, deleteNote, getAllNote } from '~/services/NoteService';
import { updateNote } from '~/redux/noteSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFolder } from '~/services/FolderService';
import { useLoading } from '~/context/LoadingContext';

type FolderItemProps = {
    name: string;
    id: string;
    setReload: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const FolderItem = ({ setReload, name, id }: FolderItemProps) => {
    const [listNote, setListNote] = useState([]);
    const [reloadNote, setReloadNote] = useState<boolean>(false);
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const noteId = params.get('noteId');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setLoading = useLoading();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                // Fetch data from API
                const res = await getAllNote(id);
                setListNote(res.notes);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNote();
    }, [reloadNote]);

    const setTextEditor = (id: string, content: string) => {
        dispatch(updateNote({ content }));
        navigate(`/?noteId=${id}`);
    };

    const removeFolder = async () => {
        try {
            if (confirm('Bạn có muốn xóa folder này không')) {
                setLoading(true);
                await deleteFolder(id);
                setReload((prev) => !prev);
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removeNote = async (noteId: string) => {
        try {
            if (confirm('Bạn có muốn xóa note này không')) {
                setLoading(true);
                await deleteNote(noteId);
                setReloadNote((prev) => !prev);
                navigate('/');
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addNote = async () => {
        try {
            setLoading(true);
            const res = await createNote({
                folderId: id,
                content: '',
            })
            navigate(`/?noteId=${res.note.id}`);
            setReloadNote((prev) => !prev);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <details className="group">
            <summary className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
                <span className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faFolder} />
                    <span>{name}</span>
                </span>
                <span className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        ></path>
                    </svg>
                    <span className="hover:text-red-500" onClick={removeFolder}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </span>
            </summary>
            <article className="px-4 pb-4">
                <ul className="flex flex-col gap-2 pl-2">
                    {listNote.map(
                        (
                            item: { content: string; id: string },
                            index: number
                        ) => (
                            <li
                                key={index}
                                className={`hover:text-zinc-700 p-2 rounded-md overflow-hidden flex items-center justify-between, ${
                                    noteId === item.id ? 'bg-zinc-500' : ''
                                }`}
                            >
                                <p
                                    className="cursor-pointer truncate max-w-[30ch]"
                                    onClick={() =>
                                        setTextEditor(item.id, item.content)
                                    }
                                >
                                    {item.content.replace(/(<([^>]+)>)/gi, '')}
                                </p>
                                <span className='text-right'>
                                    <FontAwesomeIcon
                                        className="hover:text-red-500 cursor-pointer"
                                        icon={faXmark}
                                        onClick={() => removeNote(item.id)}
                                    />
                                </span>
                            </li>
                        )
                    )}
                    <li
                        className="hover:text-zinc-400 p-2 rounded-md overflow-hidden flex items-center gap-2 justify-center hover:bg-slate-500"
                        onClick={addNote}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </li>
                </ul>
            </article>
        </details>
    );
};

export default FolderItem;
