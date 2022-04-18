import { createAsyncThunk } from "@reduxjs/toolkit";
import { createTodoGroupAsync, createNewTodoAsync, toggleTodoAsync, removeTodoAsync, removeTodoGroupAsync, getGroupsAsync } from "../../core/logic/TodoLogic";
import { TodoEvent } from "../../core/Todo";
import { TodoGroupEvent } from "../../core/TodoGroup";
import { CreateGroup, RemoveGroup } from "../interfaces/GroupActions";
import { CreateTodo, RemoveTodo, ToggleTodo } from "../interfaces/TodoActions";

export const createTodoGroupThunk = createAsyncThunk('todos/createTodoGroup', async (data: CreateGroup, thunkAPI) => {
    try{
        const retval =  await createTodoGroupAsync(data.group_name)
        console.log(retval)
        return retval
    }
    catch(ex) {
        thunkAPI.rejectWithValue(ex)
    }
})


export const createTodoThunk = createAsyncThunk('todos/createTodo', async (data: CreateTodo, thunkAPI) => {
    try{
        return await createNewTodoAsync(data.text, data.group_id)
    }
    catch(ex) {
        // do some handling here I guess? - fuck you Taso I'll comment wherever I want to.
        thunkAPI.rejectWithValue(ex)
    }
})

export const toggleTodoThunk = createAsyncThunk('todos/toggleTodo', async (data: ToggleTodo, thunkAPI) => {
    try{
        await toggleTodoAsync(data.todo_id)
        const todoToggled: TodoEvent = {
            group_id: data.group_id,
            todo_id: data.todo_id
        }

        return todoToggled
    }
    catch(ex) {
        thunkAPI.rejectWithValue(ex)
    }
})

export const removeTodoThunk = createAsyncThunk('todos/removeTodo', async (data: RemoveTodo, thunkAPI) => {
    try{
        await removeTodoAsync(data.todo_id)
        const todoEvent: TodoEvent = {
            group_id: data.group_id,
            todo_id: data.todo_id
        }

        return todoEvent
    }
    catch(ex) {
        thunkAPI.rejectWithValue(ex)
    }
})

export const removeGroupThunk = createAsyncThunk('todos/removeGroup', async (data: RemoveGroup, thunkAPI) => {
    try{
        await removeTodoGroupAsync(data.group_id)

        const group_event: TodoGroupEvent = {
            group_id: data.group_id
        }
        return group_event
    }
    catch(ex) {
        thunkAPI.rejectWithValue(ex)
    }
})

export const getGroupsThunk = createAsyncThunk('todos/getGroupsThunk', async (_, thunkAPI) => {
    try{
        return await getGroupsAsync()
    }
    catch(ex) {
        thunkAPI.rejectWithValue(ex)
    }
})