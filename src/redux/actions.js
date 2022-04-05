import { ADD_PEDIDO, TOGGLE_PEDIDOS_LIST } from "./types";

let nextTodoId = 0;

export const addPedido = content => ({
  type: ADD_PEDIDO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const togglePedidosList = id => ({
  type: TOGGLE_PEDIDOS_LIST,
  payload: { id }
});


