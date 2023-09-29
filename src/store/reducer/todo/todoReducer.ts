import { createSlice } from "@reduxjs/toolkit";

export const TodoReducer = createSlice({
 name: "TodoReducer",
 initialState: {
  listTodo: [],
  loading: false,
  error: null,
 },
 reducers: {}
})