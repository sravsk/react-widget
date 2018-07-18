import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/Widget.jsx';

describe('Widget', () => {
  const mockFn = jest.fn();
  it('should be defined', () => {
    expect(Widget).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <Widget />
    );
    expect(tree).toMatchSnapshot();
  });
});