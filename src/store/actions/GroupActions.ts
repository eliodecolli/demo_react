import Todo from "../../core/Todo";

export interface CreateGroup {
    group_id: string;
    group_name: string;
    items?: Todo[];
}

export interface RemoveGroup {
    group_id: string;
}