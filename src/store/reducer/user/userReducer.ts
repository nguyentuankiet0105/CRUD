import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUser,
  createUser,
  editUser,
  deleteUser,
} from "@service/userService";

export const userReducer = createSlice({
  name: "userReducer",
  initialState: {
    listUser: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get users
    builder
      .addCase(getAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.listUser = action.payload;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.loading = false;
      });
    // create user
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.listUser.push(action.payload);
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      }),
      // edit user
      builder
        .addCase(editUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(editUser.fulfilled, (state, action) => {
          state.loading = false;
          state.listUser = state.listUser.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        })
        .addCase(editUser.rejected, (state) => {
          state.loading = false;
        }),
      // delete user
      builder
        .addCase(deleteUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          const { id } = action.payload;
          if (id) {
            state.listUser = state.listUser.filter((item) => item.id !== id);
          }
        })
        .addCase(deleteUser.rejected, (state) => {
          state.loading = false;
        });
  },
});
