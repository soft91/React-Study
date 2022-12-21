import React, { useState, useMemo } from "react";
import "./App.css";
import { Table } from "./components";
import { usePagination } from "./hooks/usePagination";
import { ColumnStructure } from "./components/Table/types";

function App() {
	const [data, setData] = useState<boolean>(false);
	const pagination = usePagination();
	const column: ColumnStructure<any>[] = useMemo(
		() => [
			{
				width: 1,
				field: "pharmName",
				headerName: "약국명",
				RenderComponent: (item, field) => <>{"안녕1"}</>,
			},
			{
				width: 1,
				field: "name",
				headerName: "이름",
				RenderComponent: (item, field) => <>{"안녕2"}</>,
			},
			{
				width: 1,
				field: "visit",
				headerName: "방문횟수",
				RenderComponent: (item, field) => <>{"안녕3"}</>,
			},
		],
		[pagination]
	);

	return (
		<div className="App">
			<Table data={data} columns={column} pagination={pagination} />
		</div>
	);
}

export default App;
