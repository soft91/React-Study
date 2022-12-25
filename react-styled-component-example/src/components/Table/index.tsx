import { useState } from "react";
import styled from "styled-components";
import Pagination from "../Pagination";
import { IProps } from "./types";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const TableContainer = styled.div`
	display: grid;
	font-size: 1.2em;
	grid-gap: 0;
	margin: 20px;
	border-top: 2px solid #aaa;
	border-left: 2px solid #aaa;

	div {
		border-right: 2px solid #aaa;
		border-bottom: 2px solid #aaa;
	}
`;

const Column = styled.div<{ cols: number }>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
`;

const Header = styled.div<{ size: number }>`
	display: grid;
	justify-items: center;
	align-items: center;
	font-weight: bold;
	height: 5rem;
`;

const Row = styled.div<{ rows?: number }>`
	display: grid;
	grid-template-rows: ${(props) => `repeat(${props.rows}, 1fr)`};
`;

const Items = styled.div`
	display: grid;
	justify-items: center;
	align-items: center;
	font-weight: bold;
	height: 3rem;
`;

const Table: <P>(
	p: React.PropsWithChildren<IProps<P>>
) => React.ReactElement<IProps<P>> = ({ columns, data, pagination }) => {
	return (
		<Container>
			<TableContainer>
				<Column cols={columns.length}>
					{columns.map((item) => (
						<Header
							size={item.width}
							key={`${String(item.field)}_${item.headerName}_title`}
							//onClick={sort}
						>
							{item.headerName}
						</Header>
					))}
				</Column>
				<Row>
					<Column cols={columns.length}>
						{data.map((item: any) => {
							return Object.values(item).map((value: any, index) => (
								<Items key={index}>{value}</Items>
							));
						})}
					</Column>
				</Row>
			</TableContainer>
			<Pagination pagination={pagination} />
		</Container>
	);
};

export default Table;
