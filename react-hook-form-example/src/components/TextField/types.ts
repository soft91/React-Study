import React, { ChangeEvent, CSSProperties, MutableRefObject } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
	name?: string;
	className?: string;
	type?: string;
	label?: string;
	value: string;
	setValue: (e: ChangeEvent<HTMLInputElement>) => void;
	style?: CSSProperties;
	disabled?: boolean;
	placeholder?: string;
	register?: UseFormRegisterReturn; // 회원가입(React Hook Form) 전용 Attr
}

export type { IProps };
