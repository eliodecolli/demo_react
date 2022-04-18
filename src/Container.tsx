import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthorization } from "./core/Hooks";
import { setupAxios } from "./core/logic/TodoLogic";
import { getGroupsThunk } from "./store/thunks/TodoThunks";

export default function Container({ children }: {children: JSX.Element}) {
    const [_, token] = useAuthorization()
    const dispatch = useDispatch()

    useEffect(() => {
        if ( token ) {
            //const token = localStorage.getItem('x-token') as string;
            setupAxios(token as string)
            dispatch(getGroupsThunk())
        }
    }, [token])

    return children
}