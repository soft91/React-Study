import styled from "styled-components";
import Pagination from "../Pagination";
import { IProps } from "./types";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
`;

const TableContainer = styled.div`
	display: grid;
	font-size: 1.2em;
	height: 100%;
	border-top: 1px solid #aaa;
	border-left: 1px solid #aaa;
`;

const TableHeader = styled.div`
	display: grid;
	align-items: center;
	font-weight: bold;
`;

const TableBody = styled.div``;

const Column = styled.div<{ cols?: number }>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
`;

const Row = styled.div<{ rows?: number }>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.rows}, 1fr)`};
`;

const Items = styled.div`
	display: grid;
	justify-items: center;
	align-items: center;
	font-weight: bold;
	padding: 0px 10px;
	text-overflow: ellipsis;
	overflow: hidden;
	height: 3rem;
	border-right: 1px solid #aaa;
	border-bottom: 1px solid #aaa;
`;

const Table: <P>(
	p: React.PropsWithChildren<IProps<P>>
) => React.ReactElement<IProps<P>> = ({ columns, data, pagination }) => {
	return (
		<Container>
			<TableContainer>
				<TableHeader>
					<Row>
						<Column cols={columns.length}>
							{columns.map((item, index) => (
								<Items key={index}>{item.headerName}</Items>
							))}
						</Column>
					</Row>
				</TableHeader>
				<TableBody>
					{data.map((item: any, index) => {
						return (
							<Row key={index}>
								<Column cols={columns.length}>
									{Object.values(item).map((value: any, index) => (
										<Items key={index}>
											<span>{value}</span>
										</Items>
									))}
								</Column>
							</Row>
						);
					})}
				</TableBody>
			</TableContainer>
			{data.length >= 10 && <Pagination pagination={pagination} />}
		</Container>
	);
};

export default Table;
