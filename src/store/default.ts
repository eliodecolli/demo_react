import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit'
import Todo, { TodoEvent } from '../core/Todo';
import TodoGroup, { TodoGroupEvent } from '../core/TodoGroup'
import { Login } from './interfaces/AuthActions';
import { CreateGroup, RemoveGroup } from './interfaces/GroupActions'
import { CreateTodo, RemoveTodo, ToggleTodo } from './interfaces/TodoActions'
import { initAppThunk } from './thunks/AuthThunks';
import { createTodoGroupThunk, createTodoThunk, getGroupsThunk, removeGroupThunk, removeTodoThunk, toggleTodoThunk } from './thunks/TodoThunks';


interface TodosStoreState {
    tgroups: Map<string, TodoGroup>;
}

interface AuthStoreState {
    username: string;
    token: string | undefined;
    isLoggedIn: boolean;
}

interface AppStoreState {
    worker_triggered: boolean;
}

const authInitialState: AuthStoreState = {
    username: 'Anon',
    token: undefined,
    isLoggedIn: false
}

const todosInitialState: TodosStoreState = {
    tgroups: new Map<string, TodoGroup>()
}

const appInitialState: AppStoreState = {
    worker_triggered: false
}

const todos_slice = createSlice({
    name: 'todos',
    initialState: todosInitialState,
    reducers: {
   
    },
    extraReducers: (builder) => {
        builder.addCase(createTodoThunk.fulfilled, (state, action) => {
            const item = action.payload as Todo;  // it's fulfilled isn't it?

            state.tgroups.get(item.group_id)?.items.push({
                id: item.id,
                group_id: item.group_id,
                text: item.text,
                completed: false
            })
        })

        builder.addCase(createTodoGroupThunk.fulfilled, (state, action) => {
            const item = action.payload as TodoGroup;

            console.log(item)

            state.tgroups.set(item.id, {
                id: item.id,
                name: item.name,
                items: item.items ? item.items : []
            })
        })

        builder.addCase(getGroupsThunk.fulfilled, (state, action) => {
            const items = action.payload as TodoGroup[];

            items.forEach(item => {
                state.tgroups.set(item.id, {
                    id: item.id,
                    name: item.name,
                    items: item.items ? item.items : []
                })
            });
        })

        builder.addCase(toggleTodoThunk.fulfilled, (state, action) => {
            const event = action.payload as TodoEvent;
            let group = state.tgroups.get(event.group_id)

            if ( group ) {
                let item = group.items.find(x => x.id == event.todo_id)
                if ( item ) {
                    item.completed = !item.completed
                }
            }
        })

        builder.addCase(removeGroupThunk.fulfilled, (state, action) => {
            const event = action.payload as TodoGroupEvent;
            state.tgroups.delete(event.group_id)
        })

        builder.addCase(removeTodoThunk.fulfilled, (state, action) => {
            const event = action.payload as TodoEvent;

            let group = state.tgroups.get(event.group_id)
            if ( group ) {
                group.items = group.items.filter(x => x.id != event.todo_id)
            }
        })
    }
})

const app_slice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        changeWorkerState(state, action: PayloadAction<boolean>) {
            state.worker_triggered = action.payload
        }
    }
})


const auth_slice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setLoggedin(state) {
            state.isLoggedIn = true
        }
    }
})

const store = configureStore({
    reducer: {
        todos: todos_slice.reducer,
        auth: auth_slice.reducer,
        app: app_slice.reducer
    },
    devTools: true
})

// export const { createGroup, removeGroup, createTodo, removeTodo, toggleTodo } = todos_slice.actions
export const { setLoggedin } = auth_slice.actions
export const { changeWorkerState } = app_slice.actions
export type RootState = ReturnType<typeof store.getState>
export type {TodosStoreState, AppStoreState, AuthStoreState}
export default store;