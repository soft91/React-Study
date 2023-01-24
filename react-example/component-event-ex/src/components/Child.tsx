import React from "react";

type SelectChangeEvent<T = string> =
	| (Event & { target: { value: T; name: string } })
	| React.ChangeEvent<HTMLInputElement>
	| any;

const Child = ({ onChange }: SelectChangeEvent) => {
	return (
		<button
			onClick={(e) => {
				Object.defineProperty(e, "target", {
					writable: true,
					value: { value: "테스트!!!", name: "testData" },
				});
				onChange(e);
			}}
		>
			클릭해서 Change!
		</button>
	);
};

export default Child;
