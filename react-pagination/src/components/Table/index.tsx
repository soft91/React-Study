import styled from "styled-components";
import Pagination from "../Pagination";
import { IProps } from "./types";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px;
	padding: 20px;
`;

const TableContainer = styled.div`
	display: grid;
	width: 100%;
	max-width: 1200px;
	background: #ffffff;
	border-radius: 12px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06);
	overflow: hidden;
`;

const TableHeader = styled.div`
	display: grid;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const TableBody = styled.div`
	background: #ffffff;
`;

const Row = styled.div<{ rows?: number; isHeader?: boolean }>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.rows}, 1fr)`};
	transition: background-color 0.2s ease;

	&:not(:first-child) {
		&:hover {
			background-color: #f8f9ff;
		}
	}

	&:nth-child(even):not(:first-child) {
		background-color: #fafbfc;
	}

	&:nth-child(even):not(:first-child):hover {
		background-color: #f0f2ff;
	}
`;

const HeaderItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 16px 20px;
	color: #ffffff;
	font-weight: 600;
	font-size: 0.95rem;
	letter-spacing: 0.5px;
	text-transform: uppercase;
	border-right: 1px solid rgba(255, 255, 255, 0.2);

	&:last-child {
		border-right: none;
	}
`;

const Items = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 14px 20px;
	color: #2d3748;
	font-size: 0.9rem;
	font-weight: 500;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	min-height: 3.5rem;
	border-right: 1px solid #e2e8f0;
	border-bottom: 1px solid #e2e8f0;
	transition: color 0.2s ease;

	&:last-child {
		border-right: none;
	}
`;

const Table: <P>(
	p: React.PropsWithChildren<IProps<P>>
) => React.ReactElement<IProps<P>> = ({ columns, data, pagination }) => {
	const { totalCount, size, maxPage } = pagination;
	const shouldShowPagination = totalCount > size && maxPage > 1;

	return (
		<Container>
			<TableContainer>
				<TableHeader>
					<Row rows={columns.length}>
						{columns.map((item, index) => (
							<HeaderItem key={index}>{item.headerName}</HeaderItem>
						))}
					</Row>
				</TableHeader>
				<TableBody>
					{data.map((rowItem: any, rowIndex) => {
						return (
							<Row key={rowIndex} rows={columns.length}>
								{columns.map((column, colIndex) => (
									<Items key={colIndex}>
										{column.RenderComponent(
											rowItem,
											column.field,
											rowIndex
										)}
									</Items>
								))}
							</Row>
						);
					})}
				</TableBody>
			</TableContainer>
			{shouldShowPagination && <Pagination pagination={pagination} />}
		</Container>
	);
};

export default Table;
