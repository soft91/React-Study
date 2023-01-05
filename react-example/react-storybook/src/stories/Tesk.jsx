import React from "react";

export default function Task({
	task: id,
	title,
	state,
	onArchiveTask,
	onPinTask,
}) {
	return (
		<div>
			<label>
				<input
					type="checkbox"
					defaultChecked={state === "TASK_ARCHIVED"}
					disabled={true}
					name="checked"
				/>
				<span onClick={() => onArchiveTask(id)} id={id} aria-label={id} />
			</label>
			<div>
				<input
					type="text"
					value={title}
					readOnly={true}
					placeholder={"Input title"}
				/>
			</div>
			<div onClick={(e) => e.stopPropagation()}>
				{state !== "TASK_ARCHIVED" && (
					<a onClick={() => onPinTask(id)}>
						<span id={id} aria-label={id} />
					</a>
				)}
			</div>
		</div>
	);
}
