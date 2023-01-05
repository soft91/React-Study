<<<<<<< HEAD
import React from "react";
import Button from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IProps } from "./types";

export default {
	title: "Button",
	component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
=======
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "./index";
import { IProps } from "./types";

export default {
	component: Button,
	title: "Example/Button",
} as ComponentMeta<typeof Button>;

>>>>>>> 9583e20ce185da5df500ae9367a6bc0deefdba5a
const Template: ComponentStory<typeof Button> = (args: IProps) => (
	<Button {...args} />
);

<<<<<<< HEAD
export const Primary = Template.bind({});
Primary.args = {
	children: "test",
};

export const Active = Template.bind({});
Active.args = {
	children: "test",
	theme: "active",
=======
export const Default = Template.bind({});
Default.args = {
	children: "",
	color: "",
	size: "",
	fontColor: "",
	disabled: true,
};

export const Large = Template.bind({});
Large.args = {
	size: "large",
};

export const Small = Template.bind({});
Large.args = {
	size: "small",
>>>>>>> 9583e20ce185da5df500ae9367a6bc0deefdba5a
};
