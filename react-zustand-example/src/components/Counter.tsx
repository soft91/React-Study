import { useCounterStore } from "../store/counterStore";

export function Counter() {
	const count = useCounterStore((state) => state.count); // ✅ 상태 선택
	const inc = useCounterStore((state) => state.inc); // ✅ 함수 선택

	return (
		<div>
			<span>{count}</span>
			<button onClick={inc}>one up</button>
		</div>
	);
}
