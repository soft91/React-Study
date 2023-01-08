import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import FileInput from "./index";
import { IProps, IFileTypes } from "./types";

export default {
	title: "Common/FileInput",
	component: FileInput,
} as ComponentMeta<typeof FileInput>;

// TODO: CSF 방식으로 FileInput 동작이 안되고 있음. storiesOf 방식으로는 가능
// useState를 Props로 넘기지만 실제 FileInput에서 Props를 인식하지 못함.
// 실제 웹에서는 정상적으로 동작함. 방법을 더욱 찾아봐야될거 같음.

const Template: ComponentStory<typeof FileInput> = (args: IProps) => {
	const [value, setValue] = useState<IFileTypes[]>([]);
	return <FileInput {...args} value={value} setValue={setValue} />;
};

export const Primary = (Template.bind({}).args = {});

export const MultiFile = (Template.bind({}).args = {
	multiple: true,
});

export const DragFile = (Template.bind({}).args = {
	drag: true,
});

// storiesOf("Common/FileInput", module)
// 	.add("Primary", () => {
// 		const [value, setValue] = useState<IFileTypes[]>([]);
// 		return <FileInput value={value} setValue={setValue} />;
// 	})
// 	.add("MultiFile", () => {
// 		const [value, setValue] = useState<IFileTypes[]>([]);
// 		return <FileInput value={value} setValue={setValue} multiple={true} />;
// 	})
// 	.add("DragFile", () => {
// 		const [value, setValue] = useState<IFileTypes[]>([]);
// 		return <FileInput value={value} setValue={setValue} drag={true} />;
// 	});
