import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Example } from "./components/example";
import "./App.css";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Example />
		</QueryClientProvider>
	);
}

export default App;
