import { useCallback, useEffect, useState, useMemo } from "react";
import { usePagination } from "./hooks/index";
import { ColumnStructure } from "./components/Table/types";
import Table from "./components/Table";

interface ITodo {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
}

interface ApiResponse {
	todos: ITodo[];
	total: number;
	skip: number;
	limit: number;
}

export default function App() {
	const [data, setData] = useState<ITodo[]>([]);
	const pagination = usePagination();
	const { size, page, setPagination } = pagination;

	const column: ColumnStructure<ITodo>[] = useMemo(
		() => [
			{
				width: 1,
				field: "id",
				headerName: "ID",
				RenderComponent: (item, field) => <>{item[field]}</>,
			},
			{
				width: 1,
				field: "todo",
				headerName: "할 일",
				RenderComponent: (item, field) => <>{item[field]}</>,
			},
			{
				width: 1,
				field: "completed",
				headerName: "완료여부",
				RenderComponent: (item, field) => (
					<>{item[field] ? "완료" : "미완"}</>
				),
			},
			{
				width: 1,
				field: "userId",
				headerName: "아이디",
				RenderComponent: (item, field) => <>{item[field]}</>,
			},
		],
		[]
	);

	const getData = useCallback(async () => {
		try {
			const response = await fetch(
				`https://dummyjson.com/todos?limit=${size}&skip=${
					(page - 1) * size
				}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: ApiResponse = await response.json();
			setData(data.todos);
			setPagination(size, data.total, page);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	}, [page, size, setPagination]);

	useEffect(() => {
		getData();
	}, [getData]);

	return <Table<ITodo> columns={column} data={data} pagination={pagination} />;
}
