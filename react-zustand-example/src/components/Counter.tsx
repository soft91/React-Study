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
			<span>{count}</span>
			<button onClick={inc}>one up</button>
		</div>
	);
}
