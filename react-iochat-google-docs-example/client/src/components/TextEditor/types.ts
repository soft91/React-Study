import { MutableRefObject } from "react";

export interface TextEditorProps {
	text: string;
	onChangeTextHandler: (content: string, delta: any, source: string) => void;
	reactQuillRef: MutableRefObject<any | null>;
	onChangeSelection: (selection: any, source: any) => void;
}
