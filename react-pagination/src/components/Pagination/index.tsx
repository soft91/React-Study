import styled from "styled-components";
import { IPagination } from "./types";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 8px;
	margin-top: 2rem;
	padding: 1rem;
`;

const Button = styled.button`
	cursor: pointer;
	background: #ffffff;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	padding: 10px 16px;
	font-size: 0.875rem;
	font-weight: 500;
	color: #4a5568;
	transition: all 0.2s ease;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

	&:hover:not(:disabled) {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: #ffffff;
		border-color: transparent;
		box-shadow: 0 4px 6px rgba(102, 126, 234, 0.25);
		transform: translateY(-1px);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
	}

	&:disabled {
		color: #cbd5e0;
		cursor: not-allowed;
		background: #f7fafc;
		border-color: #e2e8f0;
		box-shadow: none;
	}
`;

const PageWrapper = styled.div`
	display: flex;
	gap: 6px;
	margin: 0 8px;
`;

const Page = styled.button<{ selected: boolean }>`
	width: 2.75rem;
	height: 2.75rem;
	font-size: 0.9rem;
	font-weight: 600;
	line-height: 1;
	text-align: center;
	border-radius: 8px;
	background: ${({ selected }) =>
		selected
			? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
			: "#ffffff"};
	color: ${({ selected }) => (selected ? "#ffffff" : "#4a5568")};
	border: ${({ selected }) => (selected ? "none" : "1px solid #e2e8f0")};
	cursor: pointer;
	transition: all 0.2s ease;
	box-shadow: ${({ selected }) =>
		selected
			? "0 4px 6px rgba(102, 126, 234, 0.25)"
			: "0 1px 2px rgba(0, 0, 0, 0.05)"};

	&:hover:not(:disabled) {
		background: ${({ selected }) =>
			selected
				? "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)"
				: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
		color: #ffffff;
		border-color: transparent;
		box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
		transform: translateY(-2px);
	}

	&:active:not(:disabled) {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
	}

	&:disabled {
		cursor: default;
	}
`;

const Pagination = ({ pagination }: IPagination) => {
	const { page, maxPage, pageNumbers, selectPageNum, goToPage, goToJumpPage } =
		pagination;

	return (
		<Container>
			<Button disabled={page === 1} onClick={() => goToJumpPage("prev")}>
				First
			</Button>
			<Button disabled={page === 1} onClick={() => goToPage("prev")}>
				Previous
			</Button>
			<PageWrapper>
				{pageNumbers.map((value) => (
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
