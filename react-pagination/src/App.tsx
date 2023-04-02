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

export default function App() {
	const [data, setData] = useState<ITodo[]>([]);
	const pagination = usePagination();
	const { cntPage, page } = pagination;

	const column: ColumnStructure<ITodo>[] = useMemo(
		() => [
			{
				width: 1,
				field: "id",
				headerName: "ID",
				RenderComponent: (item, field, index) => <>{item[field]}</>,
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
				RenderComponent: (item, field) => <>{item ? "완료" : "미완"}</>,
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

	const getData = useCallback(() => {
		fetch(`https://dummyjson.com/todos?limit=${cntPage}&skip=${page}`)
			.then((res) => res.json())
			.then((data) => {
				setData(data.todos);
				pagination.setPagination(data.limit, data.total, pagination.page);
			})
			.catch((e) => console.error(e));
	}, [page, cntPage, pagination]);

	useEffect(() => {
		getData();
	}, [page]);

	return (
		<>
			<Table<ITodo> columns={column} data={data} pagination={pagination} />
		</>
	);
}
