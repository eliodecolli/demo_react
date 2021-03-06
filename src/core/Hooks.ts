import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreState, changeWorkerState, RootState, setLoggedin, TodosStoreState } from "../store/default";

export function useAuthorization() {
    const authorized = useSelector((state: RootState) => state.auth.isLoggedIn)
    // const dispatch = useDispatch()
    // const token = localStorage.getItem('x-token')

    // if ( token && !authorized ) {
    //     dispatch(setLoggedin())
    // }
    return authorized
}


// maybe generalize these two?
export function useTodosSelector<TSelected = unknown>(selector: (state: TodosStoreState) => TSelected): TSelected {
    const selected = useSelector((state: RootState) => selector(state.todos))
    return selected
}

export function useAppSelector<TSelected = unknown>(selector: (state: AppStoreState) => TSelected): TSelected {
    const selected = useSelector((state: RootState) => selector(state.app))
    return selected
}

export function useLoadingScreen(): [boolean, (state: boolean) => void] {
    const awaitState = useAppSelector(x => x.worker_triggered)
    const dispatch = useDispatch()

    const update_func = (state: boolean) => {
        setTimeout(() => dispatch(changeWorkerState(state)), 300)
    }

    return [awaitState, update_func]
}