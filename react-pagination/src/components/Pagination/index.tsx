import styled from "styled-components";
import { IPagination } from "./types";
import { useState, useCallback, useMemo } from "react";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width: 30rem;
	margin-top: 3.2rem;
`;

const Button = styled.button`
	cursor: pointer;
	background-color: #ffffff;
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
	width: 2.8rem;
	height: 2.8rem;
	font-size: 1.2rem;
	line-height: 1.6rem;
	text-align: center;
	letter-spacing: 0.01rem;
	border-radius: 100%;
	background-color: ${({ selected }) =>
		selected ? "#363740" : "transparent"};
	color: ${({ selected }) => (selected ? "#fff" : "#666666")};
	cursor: pointer;

	& + & {
		margin-left: 4px;
	}

	&:disabled {
		cursor: default;
	}
`;

const Pagination = ({ pagination }: IPagination) => {
	const [pageState, setPageState] = useState<number>(1);
	const { page, cntPage, setPagination, totalCount } = pagination;

	const maxPage = Math.ceil(totalCount / cntPage);

	const pageNumberList = useMemo(() => {
		let pageNumbers = [];

		for (let i = pageState; i < pageState + 5 && i <= maxPage; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers;
	}, [pageState]);

	const selectPageNum = useCallback((value: number) => {
		setPagination(cntPage, totalCount, value);
	}, []);

	const goToPage = useCallback(
		(move: string) => {
			setPagination(
				cntPage,
				totalCount,
				move === "next" ? page + 1 : page - 1
			);

			if (page % 5 === 0 && move === "next") {
				setPageState((prev) => prev + 5);
			}

			if (page % 5 === 1 && move === "prev") {
				setPageState((prev) => prev - 5);
			}
		},
		[pageState, page]
	);

	const goToJumpPage = useCallback(
		(move: string) => {
			setPagination(
				cntPage,
				totalCount,
				move === "next" ? page + 5 : page - 5
			);
			setPageState((prev) => (move === "next" ? (prev += 5) : (prev -= 5)));
		},
		[pageState]
	);

	return (
		<Container>
			<Button
				disabled={pageState - 5 < 1}
				onClick={() => goToJumpPage("prev")}
			>
				{"<<"}
			</Button>
			<Button disabled={page === 1} onClick={() => goToPage("prev")}>
				{"<"}
			</Button>
			<PageWrapper>
				{pageNumberList.map((value) => (
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
			<Button disabled={page === maxPage} onClick={() => goToPage("next")}>
				{">"}
			</Button>
			<Button
				disabled={pageNumberList.length < 5}
				onClick={() => goToJumpPage("next")}
			>
				{">>"}
			</Button>
		</Container>
	);
};

export default Pagination;
