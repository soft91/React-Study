import { useQuery } from "react-query";
import { getTodos } from "../apis/index";

interface IData {
	todos: {
		id: number;
		todo: string;
		completed: boolean;
		userId: number;
	}[];
}

export const Example = () => {
	const { isLoading, error, data } = useQuery<IData, Error>(
		"getTodos",
		getTodos,
		{
			refetchOnWindowFocus: false,
		}
	);

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>"An error has occurred: " + {error.message}</div>;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			{data?.todos.map((item) => (
				<span key={item.id}>{item.todo}</span>
			))}
		</div>
	);
};
