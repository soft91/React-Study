import { useState, useCallback } from "react";

export const usePagination = () => {
	const [cntPage, setCntPage] = useState<number>(10);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	const setPagination = useCallback(
		(cntPage: number, totalCount: number, page: number) => {
			setCntPage(cntPage);
			setTotalCount(totalCount);
			setPage(page);
		},
		[]
	);

	return { cntPage, totalCount, page, setPagination };
};
