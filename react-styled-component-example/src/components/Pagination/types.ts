import { usePagination } from "../../hooks/usePagination";

interface IPagination {
	pagination: ReturnType<typeof usePagination>;
}

export type { IPagination };
