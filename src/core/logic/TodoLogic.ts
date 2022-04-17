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
    name: string;
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
        name: serverObject.name,
        items: serverObject.todos.map(x => mapTodo(x))
    }
}

export async function createNewTodoAsync(token: string, text: string, group_id: string): Promise<Todo> {
    const result = await axios(
    {
        url: API_URL + '/api/todo',
        method: 'POST',
        headers: {
            "X-Token": token
        },
        data: {
            group_id,
            text
        }
    })

    return mapTodo((result.data as TodoServerObject))
}

export async function toggleTodoAsync(token: string, todoId: string): Promise<void> {
    await axios({
        url: API_URL + `/api/todo/toggle/${todoId}`,
        method: 'post',
        headers: {
            "X-Token": token
        }
    })
}

export async function removeTodoAsync(token: string, todoId: string): Promise<void> {
    await axios({
        url: API_URL + '/api/todo/' + todoId,
        method: "delete",
        headers: {
            "X-Token": token
        }
    })
}

export async function createTodoGroupAsync(token: string, name: string): Promise<TodoGroup> {
    const result = await axios(
        {
            url: API_URL + '/api/groups',
            method: 'POST',
            headers: {
                "X-Token": token
            },
            data: {
                group_name: name
            }
        })
    
    return mapGroup(result.data as GroupServerObject)
}

export async function removeTodoGroupAsync(token:string, id: string): Promise<void> {
    await axios({
        url: API_URL + '/api/groups/' + id,
        method: 'delete',
        headers: {
            "X-Token": token
        }
    })
}

export async function getGroupsAsync(token: string): Promise<TodoGroup[]> {
    const groups = await axios({
        url: API_URL + '/api/groups',
        method: 'GET',
        headers: {
            "X-Token": token
        }
    })

    return (groups.data as GroupServerObject[]).map(x => mapGroup(x))
}