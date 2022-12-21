import { useState } from "react";
import styled from "styled-components";
import Pagination from "../Pagination";
import { IProps } from "./types";

const Container = styled.div`
	display: grid;
	padding: 5px;
	gap: 5px;
	border: 3px solid currentColor;
	border-radius: 5px;
	font-size: 1.2em;
	background: #ffe300;
	transition: 0.5s;
	height: 100%;
`;

const HeaderContainer = styled.div<{ cols: number }>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
	gap: 5px;
`;

const Header = styled.div`
	display: grid;
	justify-items: center;
	align-items: center;
	border-radius: 3px;
	font-weight: bold;
	background: red;
	transition: 0.4s;
	height: 50px;
`;

const ItemContainer = styled.div<{ rows: number }>`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.rows}, 1fr)`};
	gap: 5px;
`;

const Items = styled.div`
	display: grid;
	justify-items: center;
	align-items: center;
	border-radius: 3px;
	font-weight: bold;
	background: #26ab1c;
	transition: 0.4s;
	height: 3rem;
`;

const Table = ({ columns, data, pagination }: IProps<any>) => {
	const { cntPage, page, totalCount, setPagination } = pagination;
	const [origin, setOrigin] = useState(1);

	return (
		<Container>
			<HeaderContainer cols={columns.length}>
				{columns.map((item) => (
					<Header key={index}>{headerItem}</Header>
				))}
			</HeaderContainer>
			{itemDummy.map((item) => {
				return (
					<ItemContainer rows={itemDummy.length}>
						{Object.values(item).map((value, index) => (
							<Items key={index}>{value}</Items>
						))}
					</ItemContainer>
				);
			})}
			<Pagination currentPage={cntPage} total={totalCount} />
		</Container>
	);
};

export default Table;
