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
		>
			{children}
		</Resizable>
	);
};
