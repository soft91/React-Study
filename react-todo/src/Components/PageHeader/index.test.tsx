import React from "react";
import { render, screen } from "@testing-library/react";
import 'jest-styled-components';

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { PageHeader } from "./index";

describe('<PageHeader />', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/')

    const { container } = render(
      <Router history={history}>
        <PageHeader />
      </Router>,
    );

    const label = screen.getByText('할 일 목록');
    expect(label).toBeInTheDocument();
    const goBack = screen.queryByText('돌아가기');
    expect(goBack).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders component correctly with /add URL', () => {
    const history = createMemoryHistory();
    history.push('/add')

    render(
      <Router history={history}>
        <PageHeader />
      </Router>
    );

    const label = screen.getByText('할 일 추가');
    expect(label).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    expect(goBack.getAttribute('href')).toBe('/');
  })
})