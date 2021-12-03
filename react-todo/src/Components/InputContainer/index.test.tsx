import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import 'jest-styled-components';

import { InputContainer } from './index';

describe('<InputContinaer />', () => {
  it('calls the onAdd function when the user clicks Add button', () => {
    const handleClick = jest.fn();
    render(<InputContainer onAdd={handleClick} />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    const button = screen.getByText('추가');
    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: 'study react 1' } });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  })
})