import { TodoContainer } from "./components/TodoContainer";
import { Toaster } from "@/components/ui/sonner";
import { Alert } from "./components/ui/Alert";

import "./styles/globals.css";
import "./App.css";

function App() {
	return (
		<div className="container mx-auto">
			<TodoContainer />
			<Toaster />
			<Alert />
		</div>
	);
}

export default App;
