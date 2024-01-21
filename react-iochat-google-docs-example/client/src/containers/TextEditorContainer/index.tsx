import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";
import { debounce } from "lodash-es";
import TextEditor from "../../components/TextEditor";

const cursorMap = new Map<string, any>();
const cursorColor = [
	"#FF0000",
	"#ff5e00",
	"#ffbb00",
	"#ffe400",
	"#abf200",
	"#1ddb16",
	"#00d8ff",
	"#0054ff",
];

const EditorContainer = () => {
	const timerRef = useRef<any>(null);
	const cursorRef = useRef<any>(null);
	const reactQuillRef = useRef<any>(null);

	const { id: documentId } = useParams<{ id: string }>();
	const [text, setText] = useState<string>("");

	useEffect(() => {
		socket.emit("join", documentId);
		return () => {
			socket.disconnect();
		};
	}, [documentId]);

	useEffect(() => {
		socket.once("initDocument", (res) => {
			const { _document, userList } = res;
			setText(_document);
			userList.forEach((u: any) => {
				setCursor(u);
			});
		});
	}, []);

	useEffect(() => {
		const setCursorHandler = (user: string) => {
			setCursorHandler(user);
		};
		socket.on("newUser", setCursorHandler);
		return () => {
			socket.off("newUser", setCursorHandler);
		};
	}, []);

	useEffect(() => {
		if (!reactQuillRef.current) return;
		cursorRef.current = reactQuillRef.current
			.getEditor()
			.getModule("cursors");
	}, []);

	useEffect(() => {
		const updateContentHandler = (delta: any) => {
			reactQuillRef.current.getEditor().updateContents(delta);
		};
		socket.on("receive-changes", updateContentHandler);
		return () => {
			socket.off("receive-changes", updateContentHandler);
		};
	}, []);

	useEffect(() => {
		const updateHandler = (res: { range: any; id: string }) => {
			const { range, id } = res;
			debouncedUpdate(range, id);
		};
		socket.on("receive-cursor", updateHandler);
		return () => {
			socket.off("receive-cursor", updateHandler);
		};
	}, []);

	const onChangeTextHandler = (delta: any, source: string) => {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => {
				socket.emit(
					"save-document",
					reactQuillRef.current.getEditor().getContents()
				);

				timerRef.current = null;
			}, 1000);
			if (source !== "user") return;
			socket.emit("send-changes", delta);
		}
	};

	const setCursor = (id: string) => {
		if (!cursorMap.get(id)) {
			cursorRef.current.createCursor(
				id,
				id,
				cursorColor[Math.floor(Math.random() * 8)]
			);
			cursorMap.set(id, cursorRef.current);
		}
	};

	const debouncedUpdate = debounce((range: any, id: string) => {
		cursorMap.get(id).moveCursor(id, range);
	}, 500);

	const onChangeSelection = (selection: any, source: string) => {
		if (source !== "user") return;
		socket.emit("cursor-changes", selection);
	};
	return (
		<TextEditor
			text={text}
			onChangeTextHandler={onChangeTextHandler}
			onChangeSelection={onChangeSelection}
			reactQuillRef={reactQuillRef}
		/>
	);
};

export default EditorContainer;
