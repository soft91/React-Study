import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context";

function App() {
	return (
		<StoreProvider>
			<Router>
				<Routes>
					<Route></Route>
					<Route></Route>
				</Routes>
			</Router>
		</StoreProvider>
	);
}

export default App;
