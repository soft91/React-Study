import React from "react";
import { useTable, Column, useSortBy } from "react-table";
import "./App.css";

type Columns = { col1: string; col2: string };

function App() {
	const data = React.useMemo(
		(): Columns[] => [
			{
				col1: "Hello",
				col2: "rocks",
			},
			{
				col1: "react-table",
				col2: "World",
			},
			{
				col1: "whatever",
				col2: "you want",
			},
		],
		[]
	);

	const columns: Column<{ col1: string; col2: string }>[] = React.useMemo(
		() => [
			{
				Header: "Column 1",
				accessor: "col1",
			},
			{
				Header: "Column 2",
				accessor: "col2",
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data }, useSortBy);

	return (
		<table {...getTableProps()} style={{ border: "solid 1px blue" }}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column: any) => (
							<th
								{...column.getHeaderProps(
									column.getSortByToggleProps()
								)}
							>
								{column.render("Header")}
								<span>
									{column.isSorted
										? column.isSortedDesc
											? " 🔽"
											: " 🔼"
										: ""}
								</span>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td
										{...cell.getCellProps()}
										style={{
											padding: "10px",
											border: "solid 1px gray",
											background: "papayawhip",
										}}
									>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default App;
