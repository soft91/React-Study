import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SelectBox from "./index";
import { IProps } from "./types";

export default {
	title: "Common/SelectBox",
	component: SelectBox,
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (args: IProps) => {
	const [value, setValue] = useState<string>("");
	return <SelectBox {...args} value={value} setValue={setValue} />;
};

export const Primary = Template.bind({});
Primary.args = {};

export const SearchSelect = Template.bind({});
SearchSelect.args = {
	isSearchable: true,
};
