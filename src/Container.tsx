import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthorization } from "./core/Hooks";
import { setupAxios } from "./core/logic/TodoLogic";
import { setLoggedin } from "./store/default";
import { initAppThunk } from "./store/thunks/AuthThunks";
import { getGroupsThunk } from "./store/thunks/TodoThunks";

export default function Container({ children }: {children: JSX.Element}) {
    const token = localStorage.getItem('x-token') as string;
    const dispatch = useDispatch()

    useEffect(() => {
        if ( token ) {
            dispatch(initAppThunk(token))
        }
    }, [])

    return children
}