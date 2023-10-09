import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllUser,
  createUser,
  editUser,
  deleteUser,
} from "@service/userService";
import { TUser } from '@interfaces/user-interface';
import { RootState } from "@store/index";

export const userReducer = createSlice({
  name: "userReducer",
  initialState: {
    listUser: [],
    pagination: {
      total: 0,
      page: 0,
      rowsPerPage: 5
    },
    loading: false,
    error: {},
  },
  reducers: {
    setPage: (state: RootState, action: PayloadAction) => {
      state.pagination.page = action.payload
    },
    setRowsPerPage: (state: RootState, action: PayloadAction) => {
      state.pagination.rowsPerPage = action.payload
    }
  },
  extraReducers: (builder) => {
    // get users
    builder
      .addCase(getAllUser.pending, (state: RootState) => {
        state.loading = true;
      })
      .addCase(getAllUser.fulfilled, (state: RootState, action: PayloadAction) => {
        const { total, result } = action.payload
        state.pagination.total = total
        state.listUser = result;
      })
      .addCase(getAllUser.rejected, (state: RootState, action: PayloadAction) => {
        state.loading = false;
        state.error = action.error
      });
    // create user
    builder
      .addCase(createUser.pending, (state: RootState) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state: RootState, action: PayloadAction) => {
        state.loading = false;
        state.listUser.push(action.payload);
      })
      .addCase(createUser.rejected, (state: RootState, action: PayloadAction) => {
        state.loading = false;
        state.error = action.error
      }),
      // edit user
      builder
        .addCase(editUser.pending, (state: RootState) => {
          state.loading = true;
        })
        .addCase(editUser.fulfilled, (state: RootState, action: PayloadAction) => {
          state.loading = false;
          state.listUser = state.listUser.map((item: TUser) =>
            item.id === action.payload.id ? action.payload : item
          );
        })
        .addCase(editUser.rejected, (state: RootState, action: PayloadAction) => {
          state.loading = false;
          state.error = action.error
        }),
      // delete user
      builder
        .addCase(deleteUser.pending, (state: RootState) => {
          state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state: RootState, action: PayloadAction) => {
          const { id } = action.payload;
          if (id) {
            state.listUser = state.listUser.filter((item: TUser) => item.id !== id);
          }
        })
        .addCase(deleteUser.rejected, (state: RootState, action: PayloadAction) => {
          state.loading = false;
          state.error = action.error
        });
  },
});

export const { setPage, setRowsPerPage } = userReducer.actions