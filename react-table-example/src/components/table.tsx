import React from "react";
import { useTable, TableOptions, Column } from "react-table";
import styled from "styled-components";
import { IProps } from "./types";

const Container = styled.div`
	border-radius: 1rem;
	border: 0.1rem solid #eeeeee;
`;

const TableContainer = styled.table`
	table-layout: fixed;
	border-collapse: collapse;
	text-align: center;
	width: 100%;

	thead > tr > th {
		padding: 1.8rem 1.65rem;
		font-weight: 700;
		font-size: 1.4rem;
		line-height: 2rem;
		letter-spacing: 0.03rem;
		color: #000000;
		border-bottom: 0.1rem solid #eeeeee;
	}

	tbody > tr {
		height: 4.8rem;

		&:hover {
			background-color: rgba(255, 0, 106, 0.05);
		}
	}

	tbody > tr > td {
		padding: 1.4rem 0.8rem;
		font-weight: 400;
		font-size: 1.4rem;
		line-height: 2rem;
		letter-spacing: 0.03rem;
		color: #666666;
		border-bottom: 0.1rem solid #eeeeee;
	}
`;

const DataTable = <T extends object>({ columns, items }: IProps<T>) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: items });

	return (
		<Container>
			<TableContainer {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.render("Header")}
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
										<td {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</TableContainer>
		</Container>
	);
};

export default DataTable;
