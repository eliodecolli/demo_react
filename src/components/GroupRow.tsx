import Delete from "@mui/icons-material/Delete";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAuthorization } from "../core/Hooks";
import { removeTodoGroupAsync } from "../core/logic/TodoLogic";
import { removeGroup } from "../store/default";

function GroupRow(props: {name: string, numItems: number, id: string}) {

    const [_, token] = useAuthorization()
    const dispatch = useDispatch()

    function handleGroupRemove() {
        if ( token ) {
            removeTodoGroupAsync(token, props.id).then(() => {
                console.log('should be dispatched')
                dispatch(removeGroup(
                    {
                        group_id: props.id
                    }
                ))
            })
        }
    }

    return (
        <TableRow key={props.id}>
            <TableCell>{props.name}</TableCell>
            <TableCell align="right">{props.numItems}</TableCell>
            <TableCell align="right">
                <IconButton onClick={handleGroupRemove}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default GroupRow;