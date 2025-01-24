import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import {
    convertToRaw,
    EditorState,
    ContentState,
    convertFromHTML,
} from 'draft-js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { updateNote as updateNoteService } from '~/services/NoteService';
import { useLoading } from '~/context/LoadingContext';
import { updateNote } from '~/redux/noteSlice';

export default function TextEditor() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const note = useSelector((state: RootState) => state.note); // Lấy dữ liệu từ Redux state
    const [content, setContent] = useState<string>(''); // Nội dung sẽ lưu vào DB

    // Đồng bộ nội dung từ Redux state (note) vào Editor
    useEffect(() => {
        if (note && note.content) {
            // Chuyển đổi HTML (nếu có) thành EditorState
            const blocksFromHTML = convertFromHTML(note.content);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [note]);

    // Lắng nghe thay đổi của Editor và cập nhật nội dung
    const handleEditorChange = (editorState: EditorState) => {
        setEditorState(editorState);

        const rawHTML = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
        );
        setContent(rawHTML); // Cập nhật nội dung thô (HTML) để lưu vào DB
    };

    useEffect(() => {
        console.log('Nội dung đã chỉnh sửa:', content);
    }, [content]);

    const { search } = window.location;
    const params = new URLSearchParams(search);
    const noteId = params.get('noteId');

    const dispatch = useDispatch();
    const setLoading = useLoading();
    const updateNoteContent = async () => {
        // Gọi API cập nhật note
        try {
            setLoading(true);
            const res = await updateNoteService({ content, id: noteId });
            dispatch(updateNote(res.note.content));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10">
            <div className="grid grid-cols-2 gap-5 mt-5">
                {/* Text Editor */}
                <div className="col-span-1 min-h-16 mt-2">
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

                {/* Preview nội dung HTML */}
                <div className="col-span-1">
                    <div
                        className="mt-2 h-full w-full border p-2 overflow-clip"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        </div>
    );
}
