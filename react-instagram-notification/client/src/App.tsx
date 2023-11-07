import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context";
import { LoginContainer } from "./containers";
import { PostingContainer } from "./containers";

function App() {
	return (
		<StoreProvider>
			<Router>
				<Routes>
					<Route path="/" element={<LoginContainer />}></Route>
					<Route path="/post" element={<PostingContainer />}></Route>
				</Routes>
			</Router>
		</StoreProvider>
	);
}

export default App;
