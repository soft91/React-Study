import styled from "styled-components";
import { IPagination } from "./types";
import { usePagination } from "../../hooks/usePagination";
import { useCallback } from "react";

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
	const maxPage = Math.ceil(pagination.totalCount / 10);
	let pageNumbers = [];

	for (let i = pagination.page; i < pagination.page + 5 && i <= maxPage; i++) {
		pageNumbers.push(i);
	}

	const goPrevPage = useCallback(() => {
		pagination.setPagination(
			pagination.cntPage,
			pagination.totalCount,
			pagination.page - 1
		);
	}, [pagination]);

	const goNextPage = useCallback(() => {
		pagination.setPagination(
			pagination.cntPage,
			pagination.cntPage,
			(pagination.page += 10)
		);
		return pagination.cntPage + 5 > maxPage
			? maxPage
			: (pagination.cntPage += 10);
	}, [maxPage, pagination]);

	return (
		<Container>
			<Button disabled={pagination.page === 1} onClick={goPrevPage}>
				이전
			</Button>
			<PageWrapper>
				{pageNumbers.map((value, i) => (
					<Page
						key={value}
						selected={value === pagination.page}
						onClick={() => {
							pagination.setPagination(
								(pagination.cntPage += 10),
								pagination.totalCount,
								value
							);
						}}
						disabled={value === pagination.page}
					>
						{value}
					</Page>
				))}
			</PageWrapper>
			<Button disabled={pagination.page === maxPage} onClick={goNextPage}>
				다음
			</Button>
		</Container>
	);
};

export default Pagination;
