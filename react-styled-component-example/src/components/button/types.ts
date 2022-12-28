interface IProps {
	size?: string;
	color?: string;
	children: string;
	fontColor?: string;
	style?: React.CSSProperties;
	disabled?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type { IProps };
