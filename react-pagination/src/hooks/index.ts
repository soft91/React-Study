import { useState, useCallback } from "react";

export const usePagination = () => {
	const [pagination, setPaginationState] = useState<{
		size: number;
		totalCount: number;
		page: number;
	}>({
		size: 10,
		totalCount: 0,
		page: 1,
	});

	const setPagination = useCallback(
		(size: number, totalCount: number, page: number) => {
			setPaginationState({
				size,
				totalCount,
				page,
			});
		},
		[]
	);

	return {
		...pagination,
		setPagination,
	};
};
