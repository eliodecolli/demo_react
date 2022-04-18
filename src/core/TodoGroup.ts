import Todo from './Todo'

interface TodoGroup {
    id: string;
    items: Todo[];
    name: string;
}

export interface TodoGroupEvent {
    group_id: string;
}

export default TodoGroup;