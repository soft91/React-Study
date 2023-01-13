import React, { useState } from "react";
import Modal from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IProps } from "./types";

export default {
	component: Modal,
	title: "Common/Modal",
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args: IProps) => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Modal {...args} open={open} setOpen={setOpen}>
			test
		</Modal>
	);
};

export const Default = Template.bind({});
Default.args = {
	open: true,
};
