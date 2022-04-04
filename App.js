import React from 'react'
import AppContainer from './Navigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'

export default function App() {
  return( 
    <Provider>
      <PersistGate>
        <AppContainer/>
      </PersistGate>
    </Provider>
  )
}


