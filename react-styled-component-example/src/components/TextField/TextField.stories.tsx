import React from "react";
import TextField from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IProps } from "./types";

export default {
	title: "TextField",
	component: TextField,
} as ComponentMeta<typeof TextField>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof TextField> = (args: IProps) => (
	<TextField {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	value: "test",
};

export const Disabled = Template.bind({});
Disabled.args = {
	value: "test",
	disabled: true,
};
