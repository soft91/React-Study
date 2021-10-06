import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import 'jest-styled-components';

import { ToDoItem } from "./index";

describe(`<ToDoItem />`, () => {
  it('render component correctly', () => {
    const { container } = render(<ToDoItem label="default value" />);
    
    // Input은 필수 Props가 없기 때문에 value로 Input Element를 찾음.
    const todoItem = screen.getByText('default value');
    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('Click the Delete Button', () => {
    const handleClick = jest.fn();
    render(<ToDoItem label="default value" onDelete={handleClick} />);

    const deleteButton = screen.getByText('삭제');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(deleteButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});