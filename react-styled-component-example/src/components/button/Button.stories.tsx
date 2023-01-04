import React from "react";
import Button from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IProps } from "./types";

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
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
	color: "",
};

export const Success = Template.bind({});
Success.args = {
	children: "test",
	color: "success",
};

export const Warning = Template.bind({});
Warning.args = {
	children: "test",
	color: "warning",
};
