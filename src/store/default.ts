import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import TodoGroup from '../core/TodoGroup'
import { CreateGroup, RemoveGroup } from './actions/GroupActions'
import { CreateTodo, RemoveTodo } from './actions/TodoActions'


interface StoreState {
    tgroups: Map<string, TodoGroup>;
}

const initialState: StoreState = {
    tgroups: new Map<string, TodoGroup>()
}

const todos_slice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        createGroup(state, action: PayloadAction<CreateGroup>) {
            state.tgroups.set(action.payload.group_id, {
                id: action.payload.group_id,
                name: action.payload.group_name,
                items: []
            })
        },

        removeGroup(state, action: PayloadAction<RemoveGroup>) {
            state.tgroups.delete(action.payload.group_id)
        },

        createTodo(state, action: PayloadAction<CreateTodo>) {
            state.tgroups.get(action.payload.item.group_id)?.items.push({
                id: action.payload.item.id,
                group_id: action.payload.item.group_id,
                text: action.payload.item.text,
                deadline: action.payload.item.deadline,
                created_on: "NOW"
            })
        },

        removeTodo(state, action: PayloadAction<RemoveTodo>) {
            let group = state.tgroups.get(action.payload.group_id)

            if (group) {
                group.items = group.items.filter(x => x.id != action.payload.todo_id)
            }
        }
    }
})

const store = configureStore({
    reducer: todos_slice.reducer
})

export const { createGroup, removeGroup, createTodo, removeTodo } = todos_slice.actions
export type { StoreState }
export default store;