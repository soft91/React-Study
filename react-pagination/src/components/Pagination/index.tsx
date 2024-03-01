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
	const { page, size, setPagination, totalCount } = pagination;

	const maxPage = Math.ceil(totalCount / size);

	const getPageNumbers = () => {
		const pageNumbers = [];
		const startPage = Math.floor((page - 1) / 10) * 10 + 1;
		const endPage = Math.min(startPage + 9, maxPage);

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		return pageNumbers;
	};

	const selectPageNum = useCallback(
		(value: number) => {
			setPagination(size, totalCount, value);
		},
		[size, setPagination, totalCount]
	);

	const goToPage = useCallback(
		(move: string) => {
			let nextPage = move === "next" ? page + 1 : page - 1;
			nextPage = Math.min(Math.max(nextPage, 1), maxPage);

			setPagination(size, totalCount, nextPage);
		},
		[page, size, totalCount, maxPage, setPagination]
	);

	const goToJumpPage = useCallback(
		(move: string) => {
			let nextPage;

			if (move === "next") {
				nextPage = maxPage;
			} else {
				nextPage = 1;
			}

			setPagination(size, totalCount, nextPage);
		},
		[size, totalCount, setPagination, maxPage]
	);

	return (
		<Container>
			<Button disabled={page === 1} onClick={() => goToJumpPage("prev")}>
				First
			</Button>
			<Button disabled={page === 1} onClick={() => goToPage("prev")}>
				Previous
			</Button>
			<PageWrapper>
				{getPageNumbers().map((value) => (
					<Page
						key={value}
						selected={value === page}
						onClick={() => selectPageNum(value)}
					>
						{value}
					</Page>
				))}
			</PageWrapper>
			<Button disabled={page === maxPage} onClick={() => goToPage("next")}>
				Next
			</Button>
			<Button
				disabled={page === maxPage}
				onClick={() => goToJumpPage("next")}
			>
				Last
			</Button>
		</Container>
	);
};

export default Pagination;
