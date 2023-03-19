import React, { ReactNode } from "react";

interface accordionProps {
	title: string;
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
	callback?: Function;
	border?: boolean;
	titleStyle?: React.CSSProperties;
	titleClass?: string;
}

export type { accordionProps };
