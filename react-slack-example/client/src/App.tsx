import React from "react";
import { StoreProvider } from "./context";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { IndexContainer, MainConatiner } from "./containers/indext";

function App() {
	return (
		<StoreProvider>
			<Router>
				<Routes>
					<Route path="/" element={<IndexContainer />}></Route>
					<Route path="/main" element={<MainConatiner />}></Route>
				</Routes>
			</Router>
		</StoreProvider>
	);
}

export default App;
