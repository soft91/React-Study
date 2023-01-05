import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "./index";
import { IProps } from "./types";

export default {
	component: Button,
	title: "Example/Button",
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: IProps) => (
	<Button {...args} />
);

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
};
