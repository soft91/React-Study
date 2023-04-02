import type { Column } from "react-table";

export interface IProps<T extends object> {
	items: T[];
	columns: Column<T>[];
}
