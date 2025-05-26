import { useNode, useEditor } from "@craftjs/core";
import { Resizable } from "re-resizable";
import React, { useRef, useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";

import {
	isPercentage,
	pxToPercent,
	percentToPx,
	getElementDimensions,
} from "../../utils/numToMeasurement";

const Indicators = styled.div<{ $bound?: "row" | "column" }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;

	span {
		position: absolute;
		width: 10px;
		height: 10px;
		background: #fff;
		border-radius: 100%;
		display: block;
		box-shadow: 0px 0px 12px -1px rgba(0, 0, 0, 0.25);
		z-index: 99999;
		pointer-events: none;
		border: 2px solid #36a9e0;

		&:nth-child(1) {
			${(props) =>
				props.$bound
					? props.$bound === "row"
						? `left: 50%; top: -5px; transform: translateX(-50%);`
						: `top: 50%; left: -5px; transform: translateY(-50%);`
					: `left: -5px; top: -5px;`}
		}

		&:nth-child(2) {
			right: -5px;
			top: -5px;
			display: ${(props) => (props.$bound ? "none" : "block")};
		}

		&:nth-child(3) {
			${(props) =>
				props.$bound
					? props.$bound === "row"
						? `left: 50%; bottom: -5px; transform: translateX(-50%);`
						: `bottom: 50%; left: -5px; transform: translateY(-50%);`
					: `left: -5px; bottom: -5px;`}
		}

		&:nth-child(4) {
			bottom: -5px;
			right: -5px;
			display: ${(props) => (props.$bound ? "none" : "block")};
		}
	}
`;

export const Resizer = ({ propKey, children, ...props }: any) => {
	const {
		id,
		actions: { setProp },
		connectors: { connect },
		fillSpace,
		nodeWidth,
		nodeHeight,
		parent,
		active,
		inNodeContext,
	} = useNode((node) => ({
		parent: node.data.parent,
		active: node.events.selected,
		nodeWidth: node.data.props[propKey.width],
		nodeHeight: node.data.props[propKey.height],
		fillSpace: node.data.props.fillSpace,
	}));

	const { isRootNode, parentDirection } = useEditor((state, query) => ({
		parentDirection:
			parent &&
			state.nodes[parent] &&
			state.nodes[parent].data.props.flexDirection,
		isRootNode: query.node(id).isRoot(),
	}));

	const resizable = useRef<Resizable>(null);
	const isResizing = useRef(false);
	const editingDimensions = useRef<any>(null);
	const nodeDimensions = useRef({ width: nodeWidth, height: nodeHeight });

	const [internalDimensions, setInternalDimensions] = useState({
		width: nodeWidth,
		height: nodeHeight,
	});

	const updateInternalDimensionsInPx = useCallback(() => {
		const { width: nodeWidth, height: nodeHeight } = nodeDimensions.current;

		const parentDims = getElementDimensions(
			resizable.current?.resizable?.parentElement
		);

		setInternalDimensions({
			width: percentToPx(nodeWidth, parentDims.width),
			height: percentToPx(nodeHeight, parentDims.height),
		});
	}, []);

	const updateInternalDimensionsWithOriginal = useCallback(() => {
		const { width, height } = nodeDimensions.current;
		setInternalDimensions({ width, height });
	}, []);

	const getUpdatedDimensions = (width: number, height: number) => {
		const current = editingDimensions.current;
		return {
			width: current.width + width,
			height: current.height + height,
		};
	};

	useEffect(() => {
		if (!isResizing.current) updateInternalDimensionsWithOriginal();
	}, [nodeWidth, nodeHeight, updateInternalDimensionsWithOriginal]);

	useEffect(() => {
		const resizeListener = () => {
			updateInternalDimensionsWithOriginal();
		};

		window.addEventListener("resize", resizeListener);
		return () => window.removeEventListener("resize", resizeListener);
	}, [updateInternalDimensionsWithOriginal]);

	return (
		<Resizable
			enable={{
				top: active && inNodeContext,
				left: active && inNodeContext,
				bottom: active && inNodeContext,
				right: active && inNodeContext,
				topLeft: active && inNodeContext,
				topRight: active && inNodeContext,
				bottomLeft: active && inNodeContext,
				bottomRight: active && inNodeContext,
			}}
			ref={(ref) => {
				if (ref) {
					resizable.current = ref;
					connect(ref.resizable);
				}
			}}
			size={internalDimensions}
			style={{
				...(isRootNode ? { margin: "auto", display: "flex" } : {}),
			}}
			onResizeStart={(e) => {
				updateInternalDimensionsInPx();
				e.preventDefault();
				e.stopPropagation();

				const dom = resizable.current?.resizable;
				if (!dom) return;

				editingDimensions.current = {
					width: dom.getBoundingClientRect().width,
					height: dom.getBoundingClientRect().height,
				};

				isResizing.current = true;
			}}
			onResize={(_, __, ___, d) => {
				const dom = resizable.current?.resizable;
				if (!dom) return;

				let { width, height } = getUpdatedDimensions(d.width, d.height);

				if (isPercentage(nodeWidth)) {
					width = `${pxToPercent(
						width,
						getElementDimensions(dom.parentElement).width
					)}%`;
				} else {
					width = `${width}px`;
				}

				if (isPercentage(nodeHeight)) {
					height = `${pxToPercent(
						height,
						getElementDimensions(dom.parentElement).height
					)}%`;
				} else {
					height = `${height}px`;
				}

				setProp((prop: any) => {
					prop[propKey.width] = width;
					prop[propKey.height] = height;
				}, 500);
			}}
			onResizeStop={() => {
				isResizing.current = false;
				updateInternalDimensionsWithOriginal();
			}}
			{...props}
		>
			{children}
			{active && (
				<Indicators
					$bound={fillSpace === "yes" ? parentDirection : undefined}
				>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</Indicators>
			)}
		</Resizable>
	);
};
