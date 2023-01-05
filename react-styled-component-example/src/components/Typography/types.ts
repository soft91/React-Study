import { CSSProperties } from "styled-components";

interface IProps {
	size?: string | CSSProperties;
	color?: string;
	children: string | JSX.Element;
}

export type { IProps };
