import React from 'react'
import AppContainer from './Navigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import friendsReducer from './src/store/FriendsReducer';


const store = createStore(friendsReducer);

export default function App() {
  return(
    <Provider store={store}>
      <AppContainer/>
    </Provider>  
  )
}


