interface Todo {
    group_id: string;
    id: string;
    text: string;
    completed: boolean;
}

export interface TodoEvent {
    group_id: string;
    todo_id: string;
}

export default Todo;