import React, { ReactNode } from "react";
import { Text } from "../Text";
import { Button } from "../Button";
import { Container } from "../Container";
import { Element } from "@craftjs/core";

export const Card = ({ background, padding = 20 }) => {
	return (
		<Container background={background} padding={padding}>
			<Element id="text" canvas>
				<Text text="Title" />
				<Text text="Subtitle" />
			</Element>
			<Element className="buttons-only">
				<Button
					size="small"
					text="Learn more"
					variant="contained"
					color="primary"
				>
					Learn more
				</Button>
			</Element>
		</Container>
	);
};
