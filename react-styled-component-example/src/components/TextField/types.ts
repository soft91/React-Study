import { ChangeEvent } from "react";

interface IProps {
	id?: string;
	name?: string;
	value: string;
	setValue: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	disabled?: boolean;
	size?: string;
}

export type { IProps };
