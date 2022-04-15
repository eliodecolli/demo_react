import Todo from "../Todo";
import {v4 as uuid} from 'uuid';

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