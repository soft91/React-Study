import React, { ChangeEvent, useCallback, useState } from "react";
import Child from "./Child";

const Parent = () => {
	const [data, setData] = useState({
		testData: "",
	});

	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}, []);

	return (
		<>
			<input
				name="testData"
				value={data.testData}
				onChange={onChangeHandler}
			/>
			<Child onChange={onChangeHandler} />
		</>
	);
};

export default Parent;
