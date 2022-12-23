import { useCallback, useEffect, useState, useMemo } from "react";
import { Table, Layout } from "./components";
import { usePagination } from "./hooks/usePagination";
import { ColumnStructure } from "./components/Table/types";

interface ITodo {
	id: number;
	todo: string;
	completed: boolean;
	userId: number;
}

export default function Home() {
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
		[pagination]
	);

	const getData = useCallback(async () => {
		await fetch(`https://dummyjson.com/todos?limit=${cntPage}&skip=${1}`)
			.then((res) => res.json())
			.then((data) => {
				pagination.setPagination(data.limit, data.total, page);
				console.log("t est");
				setData(data.todos);
			})
			.catch((e) => console.log(e));
	}, [page, cntPage]);

	useEffect(() => {
		getData();
	}, [cntPage]);
	return (
		<Layout>
			<Table<ITodo> columns={column} data={data} pagination={pagination} />
		</Layout>
	);
}
