interface IProps {
	size?: string;
	color?: string;
	children: string | JSX.Element;
	fontColor?: string;
	style?: React.CSSProperties;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type { IProps };
