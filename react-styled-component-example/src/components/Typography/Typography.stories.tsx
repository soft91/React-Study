import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Typography from "./index";
import { IProps } from "./types";

export default {
	title: "Common/Typography",
	component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args: IProps) => (
	<Typography {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	children: "test",
};
