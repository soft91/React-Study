const getTodos = async () => {
	const data = await fetch(`https://dummyjson.com/todos?limit=10&skip=1`).then(
		(res) => res.json()
	);

	return data;
};

export { getTodos };
