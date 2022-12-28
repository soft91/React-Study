import { Dispatch, ReactNode, SetStateAction } from "react";

interface IProps {
	type?: string;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	height?: number;
	width?: number;
	children: ReactNode;
}

export type { IProps };
