import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Login from '../../src/views/Login';
import setupTests from '../enzymeSetup/setupTests'

 describe('Probamos el componente <Login />', () => {
  let wrapper = shallow(<Login />);

  beforeEach(() => {
         wrapper = shallow(<Login />);
  });

  test('debería mostrar <Login /> correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
  });

  // test('debe de mostrar el valor por defecto de 100', () => {
  //        const wrapper = shallow(<CounterApp value={100} />);
  //        const counterText = wrapper.find('h2').text().trim();
  //        expect(counterText).toBe('100');
  // });

  // test('debe incrementar con el botón +1', () => {
  //        wrapper.find('button').at(0).simulate('click');
  //        const counterText = wrapper.find('h2').text().trim();
  //        expect(counterText).toBe('11');
  // });

  // test('debe decrementar con el botón -1', () => {
  //  wrapper.find('button').at(2).simulate('click');
  //        const counterText = wrapper.find('h2').text().trim();
  //        expect(counterText).toBe('9');
  // });

  // test('debe de colocar (...) el valor con el botón reset', () => {
  //   const wrapper = shallow(<CounterApp value={105} />);
  //   wrapper.find('button').at(0).simulate('click');
  //   wrapper.find('button').at(1).simulate('click');
  //   const counterText = wrapper.find('h2').text().trim();
  //   expect(counterText).toBe('105');
  // });
});
