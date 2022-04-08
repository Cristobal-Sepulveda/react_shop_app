import React from 'react';
import Home from '../../src/views/Home';
import '@testing-library/jest-dom';
import { shallow, mount, render} from 'enzyme';
import setupTests from '../enzymeSetup/setupTests'
import { Provider}  from 'react-redux';
import store from "../../src/redux/store"
import { connect, useSelector } from "react-redux"
jest.useFakeTimers()

describe('<Home />', () => {
  
  let wrapper = render(<Provider store={store}>
                          <Home />
                        </Provider>)
  beforeEach(() => {
          wrapper = render(<Provider store={store}>
                              <Home />
                            </Provider>)
  });

  // test('Testeando el snapshot', () => {
  //    const tree = renderer.create( <Provider store={store}>
  //                                    <Home />
  //                                  </Provider>, { context: {}}).toJSON(); 
  //   const wrapper = shallow(<Home/>)
  test('Testeando el snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
});
