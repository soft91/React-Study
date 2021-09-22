import { render } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);
    
    expect(container.getElementsByClassName('App-logo')).toHaveLength(1); // 요소 체크
    expect(container.getElementsByClassName('App-logo')[0]).toHaveAttribute(
      'src',
      'logo.svg'
    ); // 어트리뷰트 체크
    
    expect(container.getElementsByTagName('p')).toHaveLength(1); // 요소 체크
    expect(container.getElementsByTagName('p')[0]).toHaveTextContent(
        'Edit src/App.js and save to reload.'
    ); // 문자열 체크
  
    expect(container).toMatchSnapshot();
  });
});
