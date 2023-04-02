import { usePagination } from "../../hooks/index";

interface IProps<T> {
	columns: ColumnStructure<T>[];
	data: T[];
	pagination: ReturnType<typeof usePagination>;
}

interface ColumnStructure<T> {
	width: number;
	field: keyof T;
	headerName?: string;
	RenderComponent: (item: T, field: keyof T, index: number) => JSX.Element;
}

export type { IProps, ColumnStructure };
