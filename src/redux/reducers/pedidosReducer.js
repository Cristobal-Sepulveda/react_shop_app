import * as Types from "../types";
import {useState} from 'react'

const initialState = {
  allPedidos: [],
};

export default function(state = initialState, action) {
  switch (action.type) {

    case Types.ADD_PEDIDO: {
      console.log("ADD_PEDIDO___INICIADA")
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const {allPedidos} = state
      console.log("ADD_PEDIDO___IMPRIMIENDO STORE ANTES DE EDICION: ",allPedidos)
      if(!allPedidos.includes(action.payload)){
        allPedidos.push(action.payload)
        const newState = {allPedidos}
        console.log("ADD_PEDIDO___IMPRIMIENDO STORE DESPUES DE EDICION: ",allPedidos)
        return newState
      }else{
        console.log("ADD_PEDIDO___IMPRIMIENDO STORE_EL PRODUCTO YA ESTA: ",allPedidos)
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