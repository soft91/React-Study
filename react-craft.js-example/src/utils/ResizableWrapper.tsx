import { useNode } from "@craftjs/core";
import { Resizable } from "re-resizable";

interface ResizableWrapperProps {
	children: React.ReactNode;
}
export const ResizableWrapper = ({ children }: ResizableWrapperProps) => {
	const { setProp, width, height } = useNode((node) => ({
		width: node.data.props.width,
		height: node.data.props.height,
	}));

	return (
		<Resizable
			size={{
				width: width,
				height: height,
			}}
			onResizeStop={(e, direction, ref, d) => {
				setProp((props) => {
					props.width = width + d.width;
					props.height = height + d.height;
				}, 100);
			}}
			handleStyles={{
				top: { background: "red", height: "6px" },
				right: { background: "blue", width: "6px" },
				bottom: { background: "green", height: "6px" },
				left: { background: "orange", width: "6px" },
				topRight: { background: "purple" },
				bottomRight: { background: "pink" },
				bottomLeft: { background: "cyan" },
				topLeft: { background: "yellow" },
			}}
		>
			{children}
		</Resizable>
	);
};
