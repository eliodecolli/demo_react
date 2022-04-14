import Todo from './Todo'

interface TodoGroup {
    id: string;
    items: Todo[];
    name: string;
}

export default TodoGroup;