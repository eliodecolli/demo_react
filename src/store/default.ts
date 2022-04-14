import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import TodoGroup from '../core/TodoGroup'
import { CreateGroup, RemoveGroup } from './actions/GroupActions'
import { CreateTodo, RemoveTodo, ToggleTodo } from './actions/TodoActions'


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
                created_on: "NOW",
                completed: false
            })
        },

        removeTodo(state, action: PayloadAction<RemoveTodo>) {
            let group = state.tgroups.get(action.payload.group_id)

            if ( group ) {
                group.items = group.items.filter(x => x.id != action.payload.todo_id)
            }
        },

        toggleTodo(state, action: PayloadAction<ToggleTodo>) {
            let group = state.tgroups.get(action.payload.group_id)

            if ( group ) {
                let item = group.items.find(x => x.id == action.payload.todo_id)
                if ( item ) {
                    item.completed = !item.completed
                }
            }
        }
    }
})

const store = configureStore({
    reducer: todos_slice.reducer,
    devTools: true
})

export const { createGroup, removeGroup, createTodo, removeTodo, toggleTodo } = todos_slice.actions
export type { StoreState }
export default store;