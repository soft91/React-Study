import React from "react";
import Button from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IProps } from "./types";

export default {
	title: "Button",
	component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args: IProps) => (
	<Button {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	children: "test",
};

export const Active = Template.bind({});
Active.args = {
	children: "test",
	theme: "active",
};
