import { useCounterStore } from "../store/counterStore";

export function Counter() {
	const { count, inc } = useCounterStore();
	return (
		<div>
			<span>{count}</span>
			<button onClick={inc}>one up</button>
		</div>
	);
}
