import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Table from "./index";
import { IProps } from "./types";

interface ITest {
	id: string;
	todo: string;
	userId: string;
}

export default {
	title: "Common/Table",
	component: Table,
} as ComponentMeta<typeof Table<ITest>>;

const Template: ComponentStory<typeof Table<ITest>> = (args: IProps<ITest>) => {
	return <Table {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
	columns: [
		{
			width: 1,
			field: "id",
			headerName: "ID",
			RenderComponent: (item, field, index) => <>{item[field]}</>,
		},
		{
			width: 1,
			field: "todo",
			headerName: "할 일",
			RenderComponent: (item, field, index) => <>{item[field]}</>,
		},
		{
			width: 1,
			field: "userId",
			headerName: "아이디",
			RenderComponent: (item, field, index) => <>{item[field]}</>,
		},
	],
	data: [
		{ userId: "1", todo: "할 일 1", id: "test1" },
		{ userId: "2", todo: "할 일 2", id: "test2" },
		{ userId: "3", todo: "할 일 3", id: "test3" },
	],
};
