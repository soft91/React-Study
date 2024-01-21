import QuillCursors from "quill-cursors";
import { container } from "./styles";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextEditorProps } from "./types";

const modules = {
	cursors: true,
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }],
		[{ list: "ordered" }, { list: "bullet" }],
		["bold", "italic", "underline", "strike"],
		[{ color: [] }, { background: [] }],
		[{ script: "sub" }, { script: "super" }],
		[{ align: [] }],
		["image", "blockquote", "code-block"],
		["clean"],
	],
};

Quill.register("module/cursors", QuillCursors);

const TextEditor = ({
	text,
	onChangeTextHandler,
	reactQuillRef,
	onChangeSelection,
}: TextEditorProps) => {
	return (
		<div css={container}>
			<ReactQuill
				theme="snow"
				modules={modules}
				value={text}
				onChange={onChangeTextHandler}
				onChangeSelection={onChangeSelection}
				ref={(el) => {
					reactQuillRef.current = el;
				}}
			/>
		</div>
	);
};

export default TextEditor;
