import React from "react";
import { Typography, Paper, Grid } from "@mui/material";

import { Button } from "./components/Button";
import { Text } from "./components/Text";
import { Toolbox } from "./components/Toolbox";
import { SettingsPanel } from "./components/SettingPanel";

import { Container } from "./components/Container";
import { Card } from "./components/Card";

import { Editor, Element, Frame } from "@craftjs/core";

export default function App() {
	return (
		<div>
			<Typography variant="h5" align="center">
				A super simple page editor
			</Typography>
			<Editor resolver={{ Card, Button, Text, Container, Element }}>
				<Grid container spacing={3}>
					<Grid size="grow">
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
					</Grid>
					<Grid size={5}>
						<Paper>
							<Toolbox />
							<SettingsPanel />
						</Paper>
					</Grid>
				</Grid>
			</Editor>
		</div>
	);
}
