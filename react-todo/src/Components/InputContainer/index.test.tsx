import React from 'react';
import { render, screen } from "@testing-library/react";
import 'jest-styled-components';

import { InputContainer } from './index';

describe('<InputContinaer />', () => {
  it('renders component correctly', () => {
    const { container } = render(<InputContainer />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  })
})