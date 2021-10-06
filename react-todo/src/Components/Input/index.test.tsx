import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import 'jest-styled-components';

import { Input } from "./index";

describe(`<Input />`, () => {
  it('render component correctly', () => {
    const { container } = render(<Input value="default value" />);
    
    // Input은 필수 Props가 없기 때문에 value로 Input Element를 찾음.
    const input = screen.getByDisplayValue('default value');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders placeholder correctly', () => {
    render(<Input placeholder="default placeholder" />);

    // Props로 설정 한 값이 있으면 테스트가 가능
    const input = screen.getByPlaceholderText('default placeholder');
    expect(input).toBeInTheDocument();
  });

  it('changes the data', () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText('default placeholder') as HTMLInputElement;
    fireEvent.change(input, { target : { value: 'study react' } });
    expect(input.value).toBe('study react');
  })
});