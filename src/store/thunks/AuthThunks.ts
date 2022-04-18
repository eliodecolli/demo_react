import { createAsyncThunk } from "@reduxjs/toolkit";
import { setupAxios } from "../../core/logic/TodoLogic";
import { setLoggedin } from "../default";
import { getGroupsThunk } from "./TodoThunks";

export const initAppThunk = createAsyncThunk('auth/initialConfig', (arg: string, thunkAPI) => {
    localStorage.setItem('x-token', arg)
    setupAxios(arg)
    thunkAPI.dispatch(setLoggedin())
    thunkAPI.dispatch(getGroupsThunk())
})
