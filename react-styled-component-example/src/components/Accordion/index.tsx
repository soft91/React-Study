import React, { useState, useRef } from "react";
import { accordionProps } from "./type";
import { AccordionContainer, AccordionContent, AccordionDiv } from "./style";

const Accordion = ({
	title,
	children,
	className,
	style,
	callback,
	border,
	titleStyle,
	titleClass,
}: accordionProps) => {
	const [show, setShow] = useState(false);
	const accoCont = useRef() as React.MutableRefObject<HTMLInputElement>;
	const accoWrap = useRef() as React.MutableRefObject<HTMLInputElement>;

	const setHeight = (event: React.MouseEvent<HTMLDivElement>) => {
		const height: number = accoCont.current.getBoundingClientRect().height;
		setShow((prev) => {
			if (prev) {
				accoWrap.current.style.height = "0";
			} else {
				accoWrap.current.style.height = `${height}px`;
			}
			return !prev;
		});
		callback && callback(event, !show);
	};

	return (
		<AccordionDiv
			className={show ? `on ${className}` : className}
			style={style ? style : undefined}
		>
			<AccordionContainer
				className={titleClass}
				style={titleStyle}
				onClick={setHeight}
				border={border}
			>
				<div>{title}</div>
				<div className="accoArrow"></div>
			</AccordionContainer>
			<AccordionContent>
				<div className="accoWrap" ref={accoWrap}>
					<div className="accoCont" ref={accoCont}>
						{children}
					</div>
				</div>
			</AccordionContent>
		</AccordionDiv>
	);
};

export default Accordion;
