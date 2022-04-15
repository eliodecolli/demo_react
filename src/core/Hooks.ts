import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, TodosStoreState } from "../store/default";

export function useAuthorization() {
    const authorized = useSelector((state: RootState) => state.auth.isLoggedIn)
    return authorized
}

export function useTodosSelector<TSelected = unknown>(selector: (state: TodosStoreState) => TSelected): TSelected {
    const selected = useSelector((state: RootState) => selector(state.todos))
    return selected
}