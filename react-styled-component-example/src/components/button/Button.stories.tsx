import React from "react";
import Button from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IProps } from "./types";

export default {
	component: Button,
	title: "Common/Button",
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: IProps) => (
	<Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
	children: "test",
	theme: "active",
};

export const Large = Template.bind({});
Large.args = {
	size: "large",
};

export const Small = Template.bind({});
Large.args = {
	size: "small",
};
