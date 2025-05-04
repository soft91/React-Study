import React from "react";
import { Typography, Paper, Grid } from "@mui/material";

import { Button } from "./components/Button";
import { Text } from "./components/Text";
import { Toolbox } from "./components/Toolbox";
import { SettingsPanel } from "./components/SettingPanel";

import { Container } from "./components/Container";
import { Card } from "./components/Card";

import { Editor, Frame } from "@craftjs/core";

export default function App() {
	return (
		<div style={{ margin: "0 auto", width: "800px" }}>
			<Typography variant="h5" align="center">
				A super simple page editor
			</Typography>
			<Editor resolver={{ Card, Button, Text, Container }}>
				<Grid container spacing={3}>
					<Grid item xs>
						<Frame>
							<Container padding={5} background="#eee">
								<Card />
								<Button size="small" variant="outlined">
									Click
								</Button>
								<Text size="small" text="Hi world!" />
								<Container padding={6} background="#999">
									<Text size="small" text="It's me again!" />
								</Container>
							</Container>
						</Frame>
					</Grid>
					<Grid item xs={3}>
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
