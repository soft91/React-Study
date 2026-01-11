import { useState, useCallback, useMemo } from "react";

export interface PaginationState {
	size: number;
	totalCount: number;
	page: number;
}

type PageMove = "prev" | "next";

export interface UsePaginationReturn extends PaginationState {
	setPagination: (size: number, totalCount: number, page: number) => void;
	maxPage: number;
	pageNumbers: number[];
	selectPageNum: (value: number) => void;
	goToPage: (move: PageMove) => void;
	goToJumpPage: (move: PageMove) => void;
}

export const usePagination = (): UsePaginationReturn => {
	const [pagination, setPaginationState] = useState<PaginationState>({
		size: 10,
		totalCount: 0,
		page: 1,
	});

	const setPagination = useCallback(
		(size: number, totalCount: number, page: number) => {
			setPaginationState((prev) => {
				// 값이 실제로 변경되었을 때만 업데이트 (불필요한 리렌더링 방지)
				if (
					prev.size === size &&
					prev.totalCount === totalCount &&
					prev.page === page
				) {
					return prev;
				}
				return { size, totalCount, page };
			});
		},
		[]
	);

	const maxPage = useMemo(() => {
		if (pagination.size <= 0) return 1;
		return Math.ceil(pagination.totalCount / pagination.size);
	}, [pagination.totalCount, pagination.size]);

	const pageNumbers = useMemo(() => {
		const numbers: number[] = [];
		const startPage = Math.floor((pagination.page - 1) / 10) * 10 + 1;
		const endPage = Math.min(startPage + 9, maxPage);

		for (let i = startPage; i <= endPage; i++) {
			numbers.push(i);
		}

		return numbers;
	}, [pagination.page, maxPage]);

	const selectPageNum = useCallback(
		(value: number) => {
			setPagination(pagination.size, pagination.totalCount, value);
		},
		[pagination.size, pagination.totalCount, setPagination]
	);

	const goToPage = useCallback(
		(move: PageMove) => {
			const nextPage =
				move === "next" ? pagination.page + 1 : pagination.page - 1;
			const clampedPage = Math.min(Math.max(nextPage, 1), maxPage);

			setPagination(pagination.size, pagination.totalCount, clampedPage);
		},
		[
			pagination.page,
			pagination.size,
			pagination.totalCount,
			maxPage,
			setPagination,
		]
	);

	const goToJumpPage = useCallback(
		(move: PageMove) => {
			const nextPage = move === "next" ? maxPage : 1;
			setPagination(pagination.size, pagination.totalCount, nextPage);
		},
		[pagination.size, pagination.totalCount, setPagination, maxPage]
	);

	return {
		...pagination,
		setPagination,
		maxPage,
		pageNumbers,
		selectPageNum,
		goToPage,
		goToJumpPage,
	};
};
