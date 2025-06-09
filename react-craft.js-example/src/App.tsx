import { Button } from "./components/Button";
import { Text } from "./components/Text";
import { Toolbox } from "./components/Toolbox";
import { SettingsPanel } from "./components/SettingPanel";
import { Container } from "./components/Container";
import { Card } from "./components/Card";

import { Editor, Element, Frame } from "@craftjs/core";
import { Topbar } from "./components/Topbar";

export default function App() {
	return (
		<div className="p-4 flex flex-col item-center justify-center min-h-screen bg-gray-50 m-auto">
			<h1 className="text-2xl font-semibold text-center mb-6">
				A super simple page editor
			</h1>

			<Editor resolver={{ Card, Button, Text, Container }}>
				<Topbar />
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
					<div className="md:col-span-3 bg-gray-100 p-4 rounded shadow">
						<Frame>
							<Element
								is="div"
								padding={5}
								background="#d2d2d2"
								style={{
									height: "300px",
								}}
								canvas
							></Element>
						</Frame>
					</div>
					<div className="md:col-span-2 bg-white rounded shadow p-4 space-y-4">
						<Toolbox />
						<SettingsPanel />
					</div>
				</div>
			</Editor>
		</div>
	);
}
