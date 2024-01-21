import React from "react";
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import EditorContainer from "./containers/TextEditorContainer";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Navigate replace to={`/document/${uuidV4()}`} />}
				/>
				<Route path="/documents/:id" element={<EditorContainer />} />
			</Routes>
		</Router>
	);
}

export default App;
