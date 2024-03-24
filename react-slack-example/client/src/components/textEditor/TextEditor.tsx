import { containerCss, sendCss } from "./TextEditor.style";
import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HiPaperAirplane } from "react-icons/hi2";

interface TextEditorProps {
	text: string;
	onChangeTextHandler: (text: string) => void;
	onSendHandler: () => void;
}

const modules = {
	toolbar: {
		containers: [
			[{ list: "ordered" }, { list: "bullet" }],
			["bold", "italic", "underline", "strike"],
			[{ script: "sub" }, { script: "super" }],
		],
	},
};

const TextEditor: React.FC<TextEditorProps> = ({
	text,
	onChangeTextHandler,
	onSendHandler,
}) => {
	const reactQuillRef = useRef<ReactQuill>(null);

	return (
		<div css={containerCss}>
			<HiPaperAirplane css={sendCss} onClick={onSendHandler} />
			<ReactQuill
				theme="snow"
				modules={modules}
				value={text}
				onChange={onChangeTextHandler}
				ref={reactQuillRef}
			></ReactQuill>
		</div>
	);
};

export default TextEditor;
