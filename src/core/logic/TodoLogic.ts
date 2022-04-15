import Todo from "../Todo";
import {v4 as uuid} from 'uuid';
import TodoGroup from "../TodoGroup";

export function createNewTodoAsync(text: string, group_id: string): Promise<Todo> {
    // here we should use Axios but later on I guess :)
    
    return new Promise((resolve, reject) => {
        let todo: Todo = {
            id: uuid(),
            group_id: group_id,
            text: text,
            created_on: "NOW",
            deadline: "NEVER",
            completed: false
        }

        resolve(todo)
    })
}

export function toggleTodoAsync(todoId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // axios stuff

        resolve()
    })
}

export function removeTodoAsync(todoId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // axios stuff

        resolve()
    })
}

export function createTodoGroupAsync(name: string): Promise<TodoGroup> {
    return new Promise((resolve, reject) => {
        // axios stuff
        let id = uuid()

        let group: TodoGroup = {
            id,
            name,
            items: []
        }

        resolve(group)
    })
}

export function removeTodoGroupAsync(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // axios stuff

        resolve()
    })
}