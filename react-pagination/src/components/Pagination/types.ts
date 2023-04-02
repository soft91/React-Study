import { usePagination } from "../../hooks/index";

interface IPagination {
	pagination: ReturnType<typeof usePagination>;
}

export type { IPagination };
