import Todo from "../../core/Todo";

export interface CreateGroup {
    group_name: string;
}

export interface RemoveGroup {
    group_id: string;
}