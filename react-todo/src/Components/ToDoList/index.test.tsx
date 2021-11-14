import React from "react";
import { render, screen } from "@testing-library/react";
import 'jest-styled-components';

import { ToDoListProvider } from "Contexts";
import { ToDoList } from "Components";

describe('<ToDoList />', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <ToDoListProvider>
        <ToDoList />
      </ToDoListProvider>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  })
})