import Todo from "../../core/Todo";

export interface CreateTodo {
    text: string;
    group_id: string;
}

export interface RemoveTodo {
    group_id: string;
    todo_id: string;
}

export interface ToggleTodo {
    group_id: string;
    todo_id: string;
}