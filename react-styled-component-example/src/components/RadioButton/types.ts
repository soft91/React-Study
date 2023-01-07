import { Dispatch, SetStateAction, CSSProperties } from "react";

interface IProps {
	className?: string;
	style?: CSSProperties;
	setValue: Dispatch<SetStateAction<string>>;
}

export type { IProps };
