import Todo from "../Todo";
import {v4 as uuid} from 'uuid';
import TodoGroup from "../TodoGroup";
import { API_URL } from "../Constants";
import axios from "axios";

type TodoServerObject = { 
    id: string;
    group_id: string;
    text: string;
    is_completed: boolean;
}

type GroupServerObject = {
    group_id: string;
    group_name: string;
    todos: TodoServerObject[];
}

function mapTodo(serverObject: TodoServerObject): Todo {
    return {
        id: serverObject.id,
        group_id: serverObject.group_id,
        text: serverObject.text,
        completed: serverObject.is_completed
    }
}

function mapGroup(serverObject: GroupServerObject): TodoGroup {
    return {
        id: serverObject.group_id,
        name: serverObject.group_name,
        items: serverObject.todos.map(x => mapTodo(x))
    }
}

export function setupAxios(token: string) {
    axios.defaults.headers.common['X-Token'] = token
}

export async function createNewTodoAsync(text: string, group_id: string): Promise<Todo> {
    const result = await axios(
    {
        url: API_URL + '/api/todo',
        method: 'POST',
        data: {
            group_id,
            text
        }
    })

    return mapTodo((result.data as TodoServerObject))
}

export async function toggleTodoAsync(todoId: string): Promise<void> {
    await axios({
        url: API_URL + `/api/todo/toggle/${todoId}`,
        method: 'post'
    })
}

export async function removeTodoAsync(todoId: string): Promise<void> {
    await axios({
        url: API_URL + '/api/todo/' + todoId,
        method: "delete"
    })
}

export async function createTodoGroupAsync(name: string): Promise<TodoGroup> {
    const result = await axios(
    {
        url: API_URL + '/api/groups',
        method: 'POST',
        data: {
            group_name: name
        }
    })
    
    return mapGroup(result.data as GroupServerObject)
}

export async function removeTodoGroupAsync(id: string): Promise<void> {
    await axios({
        url: API_URL + '/api/groups/' + id,
        method: 'delete'
    })
}

export async function getGroupsAsync(): Promise<TodoGroup[]> {
    const groups = await axios({
        url: API_URL + '/api/groups',
        method: 'GET'
    })

    return (groups.data as GroupServerObject[]).map(x => mapGroup(x))
}