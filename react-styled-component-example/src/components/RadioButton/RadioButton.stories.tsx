import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RadioButton from "./index";
import { IProps } from "./types";

export default {
	title: "Common/RadioButton",
	component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = (args: IProps) => {
	return <RadioButton {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {};
