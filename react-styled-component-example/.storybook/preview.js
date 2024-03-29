import React from "react";
import { ThemeProvider } from "styled-components";

export const decorators = [(Story) => <Story />];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
