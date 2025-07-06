import { useNode } from "@craftjs/core";
import { Resizable } from "re-resizable";
import { useCallback, useMemo, useEffect } from "react";

interface ResizableWrapperProps {
	children: React.ReactNode;
	minWidth?: number;
	minHeight?: number;
	maxWidth?: number;
	maxHeight?: number;
}

export const ResizableWrapper = ({
	children,
	minWidth = 50,
	minHeight = 30,
	maxWidth = 800,
	maxHeight = 600,
}: ResizableWrapperProps) => {
	const { setProp, width, height } = useNode((node) => ({
		width: node.data.props.width || 200,
		height: node.data.props.height || 50,
	}));

	// 메모이제이션된 크기 객체
	const size = useMemo(
		() => ({
			width: width || 200,
			height: height || 50,
		}),
		[width, height]
	);

	// 리사이즈 핸들 스타일 메모이제이션
	const handleStyles = useMemo(
		() => ({
			top: {
				background: "rgba(59, 130, 246, 0.5)",
				height: "8px",
				cursor: "ns-resize",
			},
			right: {
				background: "rgba(59, 130, 246, 0.5)",
				width: "8px",
				cursor: "ew-resize",
			},
			bottom: {
				background: "rgba(59, 130, 246, 0.5)",
				height: "8px",
				cursor: "ns-resize",
			},
			left: {
				background: "rgba(59, 130, 246, 0.5)",
				width: "8px",
				cursor: "ew-resize",
			},
			topRight: {
				background: "rgba(59, 130, 246, 0.7)",
				cursor: "nw-resize",
			},
			bottomRight: {
				background: "rgba(59, 130, 246, 0.7)",
				cursor: "se-resize",
			},
			bottomLeft: {
				background: "rgba(59, 130, 246, 0.7)",
				cursor: "sw-resize",
			},
			topLeft: {
				background: "rgba(59, 130, 246, 0.7)",
				cursor: "ne-resize",
			},
		}),
		[]
	);

	// 리사이즈 완료 핸들러 최적화
	const handleResizeStop = useCallback(
		(e: any, direction: any, ref: any, d: any) => {
			const newWidth = Math.max(
				minWidth,
				Math.min(maxWidth, size.width + d.width)
			);
			const newHeight = Math.max(
				minHeight,
				Math.min(maxHeight, size.height + d.height)
			);

			setProp((props) => {
				props.width = newWidth;
				props.height = newHeight;
			}, 100);

			// 크기 변경 후 부모 Container에 알림
			setTimeout(() => {
				const event = new CustomEvent("childResized", {
					detail: { width: newWidth, height: newHeight },
				});
				window.dispatchEvent(event);
			}, 150);
		},
		[
			setProp,
			size.width,
			size.height,
			minWidth,
			minHeight,
			maxWidth,
			maxHeight,
		]
	);

	return (
		<Resizable
			size={size}
			minWidth={minWidth}
			minHeight={minHeight}
			maxWidth={maxWidth}
			maxHeight={maxHeight}
			onResizeStop={handleResizeStop}
			handleStyles={handleStyles}
			enable={{
				top: true,
				right: true,
				bottom: true,
				left: true,
				topRight: true,
				bottomRight: true,
				bottomLeft: true,
				topLeft: true,
			}}
		>
			{children}
		</Resizable>
	);
};
