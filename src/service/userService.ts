import { createAsyncThunk } from "@reduxjs/toolkit";
import { TUser } from '@interfaces/user-interface';
import api from "@axios/axios"

export const getAllUser = createAsyncThunk("getAllUser", async (params: Object) => {
 const res = await api.get(`/users`, { params: params })
 const total = res.headers["x-total-count"]
 const result = res.data
 return { total, result }
})

export const createUser = createAsyncThunk("createUser", async (data: TUser) => {
 const res = await api.post("/users", data)
 const result = res.data
 return result
})

export const editUser = createAsyncThunk("editUser", async (data: TUser) => {
 const res = await api.put(`/users/${data.id}`, data)
 const result = res.data
 return result
})

export const deleteUser = createAsyncThunk("deleteUser", async (id: string) => {
 const res = await api.delete(`/users/${id}`)
 const result = res.data
 return result
})