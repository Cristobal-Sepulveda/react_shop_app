import * as Types from "../types";
import {useState} from 'react'

const initialState = {
  allPedidos: [],
};

export default function(state = initialState, action) {
  switch (action.type) {

    case Types.ADD_PEDIDO: {
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const {allPedidos} = state
      if(!allPedidos.includes(action.payload)){
        allPedidos.push(action.payload)
        const newState = {allPedidos}
        return newState
      }else{
        const newState = {allPedidos}
        return newState
      }
      
    }

    case Types.OBTENER_PEDIDOS: {
      return state
    }

    default:
      return state;
  }
}