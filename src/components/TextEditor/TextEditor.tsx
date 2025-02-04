import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { updateNote as updateNoteService } from '~/services/NoteService';
import { useLoading } from '~/context/LoadingContext';
import { updateNote } from '~/redux/noteSlice';

export default function TextEditor() {
    const dispatch = useDispatch();
    const setLoading = useLoading();
    const note = useSelector((state: RootState) => state.note);
    const noteId = new URLSearchParams(window.location.search).get('noteId');
    
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [content, setContent] = useState('');

    useEffect(() => {
        if (note?.content) {
            const blocksFromHTML = convertFromHTML(note.content);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [note]);

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
        } catch (error) {
            console.error(error);
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