import React from 'react';
import renderer from 'react-test-renderer';

import AuthLoading from '../views/AuthLoading';

describe('<AuthLoading />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<AuthLoading />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
