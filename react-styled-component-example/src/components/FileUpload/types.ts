import { Dispatch, SetStateAction } from "react";

interface IProps {
	className?: string;
	value: IFileTypes[];
	setValue: Dispatch<SetStateAction<IFileTypes[]>>;
	drag: boolean;
	multiple: boolean;
}

interface IFileTypes {
	id: number;
	file: File;
}

export type { IProps, IFileTypes };
