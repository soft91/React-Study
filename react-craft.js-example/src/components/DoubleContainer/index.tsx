import React, { useState } from "react";
import { Element, useNode } from "@craftjs/core";
import styled from "@emotion/styled";
import { Container } from "../Container";
import { ResizableWrapper } from "../../utils/ResizableWrapper";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	border: 1px dashed #ccc;
	box-sizing: border-box;
`;

const Pane = styled.div<{ flexRatio: number }>`
	flex: ${({ flexRatio }) => flexRatio};
	overflow: auto;
	border-top: 1px dashed #ccc;
`;

const Divider = styled.div`
	height: 5px;
	background: repeating-linear-gradient(
		to right,
		#ccc,
		#ccc 5px,
		transparent 5px,
		transparent 10px
	);
	cursor: row-resize;
`;

export const DoubleContainer = () => {
	const {
		connectors: { connect, drag },
	} = useNode();

	const [topRatio, setTopRatio] = useState(0.5); // top/bottom 비율

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const startY = e.clientY;
		const container = e.currentTarget.parentElement as HTMLDivElement;
		const rect = container.getBoundingClientRect();
		const startTopRatio = topRatio;

		const onMouseMove = (e: MouseEvent) => {
			const deltaY = e.clientY - startY;
			const newTopRatio = Math.min(
				0.9,
				Math.max(0.1, startTopRatio + deltaY / rect.height)
			);
			setTopRatio(newTopRatio);
		};

		const onMouseUp = () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};

		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	};

	return (
		<ResizableWrapper>
			<Wrapper
				ref={(ref) => {
					if (ref) {
						connect(drag(ref));
					}
				}}
			>
				<Pane flexRatio={topRatio}>
					<Element is={Container} id="top" canvas />
				</Pane>

				<Pane flexRatio={1 - topRatio}>
					<Element is={Container} id="bottom" canvas />
				</Pane>
			</Wrapper>
		</ResizableWrapper>
	);
};

DoubleContainer.craft = {
	displayName: "Double Container",
	props: {},
	isCanvas: true,
};
