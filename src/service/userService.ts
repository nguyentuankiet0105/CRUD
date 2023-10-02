import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TUser } from '@interfaces/user-interface';

export const getAllUser = createAsyncThunk("getAllUser", async () => {
 const res = await axios.get("http://localhost:3000/users")
 const result = res.data
 return result
})

export const createUser = createAsyncThunk("createUser", async (data: TUser) => {
 const res = await axios.post("http://localhost:3000/users", data)
 const result = res.data
 return result
})

export const editUser = createAsyncThunk("editUser", async (data: TUser) => {
 const res = await axios.put(`http://localhost:3000/users/${data.id}`, data)
 const result = res.data
 return result
})

export const deleteUser = createAsyncThunk("deleteUser", async (id: string) => {
 const res = await axios.delete(`http://localhost:3000/users/${id}`)
 const result = res.data
 return result
})