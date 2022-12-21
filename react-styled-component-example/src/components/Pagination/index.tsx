import styled from "styled-components";
import { IPagination } from "./types";
import { usePagination } from "../../hooks/usePagination";

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

const Pagination = ({ currentPage, total }: IPagination) => {
	const pagination = usePagination();
	const maxPage = Math.ceil(total / 10);
	let pageNumbers = [];

	for (let i = pagination.page; i < pagination.page + 5 && i <= maxPage; i++) {
		pageNumbers.push(i);
	}

	const goPrevPage = () => {
		pagination.setPagination(currentPage, total, (pagination.page -= 5));
	};

	const goNextPage = () => {
		pagination.setPagination(currentPage, total, (pagination.page += 5));
		return currentPage + 5 > maxPage ? maxPage : (currentPage += 5);
	};

	return (
		<Container>
			<Button disabled={currentPage - 5 < 1} onClick={goPrevPage}>
				이전
			</Button>
			<PageWrapper>
				{pageNumbers.map((value, i) => (
					<Page
						key={value}
						selected={value === currentPage}
						onClick={() =>
							pagination.setPagination(
								currentPage,
								total,
								pagination.page++
							)
						}
						disabled={value === currentPage}
					>
						{value}
					</Page>
				))}
			</PageWrapper>
			<Button disabled={currentPage === maxPage} onClick={goNextPage}>
				다음
			</Button>
		</Container>
	);
};

export default Pagination;
