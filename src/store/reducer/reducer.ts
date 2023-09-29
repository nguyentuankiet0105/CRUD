import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/userReducer";
import { TodoReducer } from "./todo/todoReducer";

const rootReducers = {
 user: userReducer.reducer,
 todo: TodoReducer.reducer
}

export default combineReducers(rootReducers)