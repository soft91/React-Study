import styled from "styled-components";
import { IPagination } from "./types";
import { useState, useCallback } from "react";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 400px;
	margin-top: 40px;
	margin-left: -20px;
`;

const Button = styled.button`
	cursor: pointer;
	&:disabled {
		color: #e2e2ea;
		cursor: default;
	}
`;

const PageWrapper = styled.div`
	display: flex;
	margin: 0 16px;
`;

const Page = styled.button<{ selected: boolean }>`
	padding: 4px 6px;
	background-color: ${({ selected }) => (selected ? "#000" : "transparent")};
	color: ${({ selected }) => (selected ? "#fff" : "#000")};
	font-size: 20px;
	cursor: pointer;

	& + & {
		margin-left: 4px;
	}

	&:disabled {
		cursor: default;
	}
`;

const Pagination = ({ pagination }: IPagination) => {
	const [page, setPage] = useState<number>(1);
	const { cntPage, setPagination, totalCount } = pagination;

	const maxPage = Math.ceil(totalCount / cntPage);

	let pageNumbers = [];

	for (let i = page; i < page + 5 && i <= maxPage; i++) {
		pageNumbers.push(i);
	}

	const selectPageNum = useCallback((value: number) => {
		setPagination(cntPage, totalCount, value);
	}, []);

	const goPrevPage = useCallback(() => {
		setPagination(cntPage, totalCount, page - 5);
		setPage((prev) => (prev -= 5));
	}, [page]);

	const goNextPage = useCallback(() => {
		setPagination(cntPage, totalCount, page + 5);
		setPage((prev) => (prev += 5));
	}, [page]);

	return (
		<Container>
			<Button disabled={page - 5 < 1} onClick={goPrevPage}>
				이전
			</Button>
			<PageWrapper>
				{pageNumbers.map((value) => (
					<Page
						key={value}
						selected={value === pagination.page}
						onClick={() => selectPageNum(value)}
						disabled={value === pagination.page}
					>
						{value}
					</Page>
				))}
			</PageWrapper>
			<Button disabled={page + 5 > maxPage} onClick={goNextPage}>
				다음
			</Button>
		</Container>
	);
};

export default Pagination;
