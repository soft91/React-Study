import { Dispatch, SetStateAction } from "react";

interface IProps {
	value?: string;
	list?: any; // 실제 리스트를 만들 배열
	placeholder?: string;
	isSearchable?: boolean;
	setValue: Dispatch<SetStateAction<string>>;
}

export type { IProps };
