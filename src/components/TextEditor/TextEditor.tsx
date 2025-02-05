import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {
    convertToRaw,
    EditorState,
    ContentState,
    convertFromHTML,
} from 'draft-js';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { RootState } from '~/redux/store';
import {
    getNote,
    updateNote as updateNoteService,
} from '~/services/NoteService';
import { useLoading } from '~/context/LoadingContext';
import { updateNote } from '~/redux/noteSlice';
import { useLocation } from 'react-router-dom';
import { useToast } from '~/context/ToastContext';

export default function TextEditor() {
    const dispatch = useDispatch();
    const setLoading = useLoading();
    const { addToast } = useToast();

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const noteId = queryParams.get('noteId');

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [content, setContent] = useState('');
    const fetchNote = async (noteId: string) => {
        try {
            const res = await getNote(noteId);
            return res.note.content;
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    useEffect(() => {
        const fetchAndSetNote = async () => {
            if (noteId) {
                const noteContent = await fetchNote(noteId);
                const blocksFromHTML = convertFromHTML(noteContent);
                const contentState = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                );
                setEditorState(EditorState.createWithContent(contentState));
            }
        };
        fetchAndSetNote();
    }, [noteId]);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
        setContent(draftToHtml(convertToRaw(state.getCurrentContent())));
    };

    const updateNoteContent = async () => {
        if (!noteId) return;
        try {
            setLoading(true);
            await updateNoteService({ content, id: noteId });
            dispatch(updateNote({ content }));
            addToast('Cập nhật note thành công', 'success');
        } catch (error) {
            console.error(error);
            addToast('Có lỗi xảy ra', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <div className="mt-5">
                <div className="min-h-36 mt-2">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        placeholder="Write something"
                        wrapperClassName="border p-2"
                        editorClassName="p-2"
                    />
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={updateNoteContent}
                            className="p-2 bg-slate-500 text-white rounded-md hover:bg-slate-700"
                        >
                            Cập nhật note
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
