import { combineReducers } from "redux";
import pedidosReducer from "./pedidosReducer";

export default combineReducers({ pedidos: pedidosReducer, });