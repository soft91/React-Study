import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import 'jest-styled-components';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    // data-testid Attribute를 통해 Element를 찾는다.
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('adds and deletes Todo Items', () => {
    render(<App />);

    const button = screen.getByText('추가');
    fireEvent.click(button);

    const todoItem = screen.getByText('study react 1');
    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(1);

    fireEvent.click(button);

    const todoItem2 = screen.getByText('study react 2');
    expect(todoItem2).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(2);

    const deleteButtons = screen.getAllByText('삭제');
    fireEvent.click(deleteButtons[0]);

    expect(todoItem).not.toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(1);
  });

  it('does not add emtpy Todo', () => {
    render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    const length = toDoList.childElementCount;

    const button = screen.getByText('추가');
    fireEvent.click(button);

    expect(toDoList.childElementCount).toBe(length);
  })
});
