import React from 'react';
import {FlatList} from "react-native"
import renderer from 'react-test-renderer';
import Home from '../../src/views/Home';
import store from '../../src/redux/store';
import { Provider } from 'react-redux';
import {loadingData } from '../../src/views/Home';

jest.useFakeTimers()

describe('<Home />', () => {
  test('Viendo si la flatList carga la data correctamente', () => {
    const tree = renderer.create( <Provider store={store}>
                                    <Home />
                                  </Provider>, { context: {}}).toJSON(); 
    return loadingData().then( data =>{
      expect(store.getState().pedidos.allPedidos.length).toBe(0)
    }) 
  });
});
