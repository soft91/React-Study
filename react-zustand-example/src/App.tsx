import { TodoContainer } from "./components/TodoContainer";
import { Toaster } from "@/components/ui/sonner";

import "./App.css";

function App() {
	return (
		<div className="container mx-auto">
			<TodoContainer />
			<Toaster />
		</div>
	);
}

export default App;
