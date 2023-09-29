import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
 name: "userReducer",
 initialState: {
  listUser: [],
  loading: false,
  error: null,
 },
 reducers: {}
})