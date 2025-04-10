import { useShallow } from "zustand/shallow";
import { useCounterStore } from "../store/counterStore";

export function Counter() {
	const { count, inc } = useCounterStore(
		useShallow((state) => ({
			count: state.count,
			inc: state.inc,
		}))
	);

	return (
		<div>
			<span className="text-3xl font-bold underline">{count}</span>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={inc}
			>
				one up
			</button>
		</div>
	);
}
