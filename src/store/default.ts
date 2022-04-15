import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import TodoGroup from '../core/TodoGroup'
import { Login } from './actions/AuthActions';
import { CreateGroup, RemoveGroup } from './actions/GroupActions'
import { CreateTodo, RemoveTodo, ToggleTodo } from './actions/TodoActions'


interface TodosStoreState {
    tgroups: Map<string, TodoGroup>;
}

interface AuthStoreState {
    username: string;
    token: string | undefined;
    isLoggedIn: boolean;
}

const authInitialState: AuthStoreState = {
    username: 'Anon',
    token: undefined,
    isLoggedIn: false
}

const todosInitialState: TodosStoreState = {
    tgroups: new Map<string, TodoGroup>()
}

const todos_slice = createSlice({
    name: 'todos',
    initialState: todosInitialState,
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

const auth_slice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {

        login(state, action: PayloadAction<Login>) {
            state.username = action.payload.userName
            state.token = action.payload.token
            state.isLoggedIn = true
        },

        logout(state) {
            state.username = 'Anon'
            state.token = undefined
            state.isLoggedIn = false
        },

        default(state) {
            return state
        }

    }
})

const store = configureStore({
    reducer: {
        todos: todos_slice.reducer,
        auth: auth_slice.reducer
    },
    devTools: true
})

export const { createGroup, removeGroup, createTodo, removeTodo, toggleTodo } = todos_slice.actions
export const { login, logout } = auth_slice.actions
export type RootState = ReturnType<typeof store.getState>
export type {TodosStoreState, AuthStoreState}
export default store;