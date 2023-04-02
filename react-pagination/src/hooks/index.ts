import { useState } from "react";

export const usePagination = () => {
	const [cntPage, setCntPage] = useState<number>(15);
	const [totalCount, setTotalCount] = useState<number>(30);
	const [page, setPage] = useState<number>(1);

	const setPagination = (
		cntPage: number,
		totalCount: number,
		page: number
	) => {
		setCntPage(cntPage);
		setTotalCount(totalCount);
		setPage(page);
	};

	return { cntPage, totalCount, page, setPagination };
};
