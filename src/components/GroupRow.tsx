import Delete from "@mui/icons-material/Delete";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAuthorization } from "../core/Hooks";
import { removeGroupThunk } from "../store/thunks/TodoThunks";

function GroupRow(props: {name: string, numItems: number, id: string}) {
    const dispatch = useDispatch()

    function handleGroupRemove() {
        dispatch(removeGroupThunk({
            group_id: props.id
        }))
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