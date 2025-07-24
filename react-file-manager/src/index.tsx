import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 성능 측정 활성화
reportWebVitals(console.log);

async function startApp() {
	if (process.env.NODE_ENV === "development") {
		const { worker } = require("./mocks/browser");
		await worker.start();
		console.log("MSW started successfully");
	}

	const root = ReactDOM.createRoot(
		document.getElementById("root") as HTMLElement
	);
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
}

startApp();
