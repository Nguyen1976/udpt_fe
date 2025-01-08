import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';

export default function TextEditor() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [content, setContent] = useState<string>(''); //Nội dung sẽ được đưa vào db

    useEffect(() => {
        console.log(content);
    }, [content]);

    const [rawHTML, setRawHTML] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    const handleEditorChange = (editorState: EditorState) => {
        setEditorState(editorState);
        const rawHTML = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
        );
        setRawHTML(rawHTML); // Cập nhật rawHTML trước

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(
            setTimeout(() => {
                setContent(rawHTML); // Gán rawHTML vào content
            }, 500)
        );
    };

    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);
    return (
        <div className="mt-10">
            <div className="grid grid-cols-2 gap-5 mt-5">
                <div className="col-span-1 min-h-16 mt-2">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        placeholder="Write something"
                        wrapperClassName="border p-2"
                        editorClassName="p-2"
                    />
                </div>
                <div className="col-span-1">
                    <div
                        className="mt-2 h-full w-full border p-2 overflow-clip"
                        dangerouslySetInnerHTML={{ __html: rawHTML }}
                    />
                </div>
            </div>
        </div>
    );
}
