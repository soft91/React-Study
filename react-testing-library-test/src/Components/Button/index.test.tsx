import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { Button } from './index';

describe('<Button />', () => {
  it('renders component correctly', () => {
    const { container } = render(<Button label="추가" />);

    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    const parent = container;
    // expect(parent).toHaveStyleRule('background-color', '#1E40FF');
    // expect(parent).toHaveStyleRule('box-shadow', 'inset 5px 5px 10px rgba(0,0,0,0.2)', {
    //   modifier: ':active',
    // });

    expect(container).toMatchSnapshot();
  });

  it('changes backgroundColor and hoverColor Props', () => {
    const { container } = render(<Button label="추가" />);
    const backgroundColor = '#FF1744';
    const hoverColor = '#F01440';
    render(<Button label="추가" backgroundcolor={backgroundColor} hovercolor={hoverColor} />);

    // const parent = container;
    // expect(parent).toHaveStyleRule('backgroundcolor', backgroundColor);
    // expect(parent).toHaveStyleRule('backgroundcolor', hoverColor, {
    //   modifier: ':hover',
    // });
  });

  // it('clicks the button', () => {
  //   const handleClick = jest.fn();
  //   render(<Button label="추가" onClick={handleClick} />);

  //   const label = screen.getByText('추가');
  //   expect(handleClick).toHaveBeenCalledTimes(0);
  //   fireEvent.click(label);
  //   expect(handleClick).toHaveBeenCalledTimes(1);
  // });
});
