import React from "react";
import { Button } from "./components/Button";
import { Text } from "./components/Text";
import { Toolbox } from "./components/Toolbox";
import { SettingsPanel } from "./components/SettingPanel";
import { Container } from "./components/Container";
import { Card } from "./components/Card";

import { Editor, Element, Frame } from "@craftjs/core";

export default function App() {
	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold text-center mb-6">
				A super simple page editor
			</h1>

			<Editor resolver={{ Card, Button, Text, Container }}>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
					{/* Canvas Area */}
					<div className="md:col-span-3 bg-gray-100 p-4 rounded shadow">
						<Frame>
							<Element
								is={Container}
								padding={5}
								background="#eee"
								canvas
							>
								<Container padding={5} background="#eee">
									<Button>Click</Button>
									<Text text="Hi world!" />
									<Element
										is={Container}
										padding={2}
										background="#999"
										canvas
									>
										<Text text="It's me again!" />
									</Element>
								</Container>
							</Element>
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
