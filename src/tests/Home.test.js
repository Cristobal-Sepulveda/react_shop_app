import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../views/Home';
import store from '../redux/store';
import { Provider } from 'react-redux';

describe('<Home />', () => {
  it('has 1 child', () => {
    const tree = async =>{
      renderer.create(
            <Provider store={store}>
                <Home />
            </Provider>, { context: {} }
        ).toJSON();
    }
    await expect(tree.children.length).toBe(1);
  });
});
