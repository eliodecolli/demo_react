import Todo from "../../core/Todo";

export interface CreateTodo {
    item: Todo
}

export interface RemoveTodo {
    group_id: string;
    todo_id: string;
}

export interface ToggleTodo {
    group_id: string;
    todo_id: string;
}