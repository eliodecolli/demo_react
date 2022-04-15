import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import GroupRow from "../components/GroupRow";
import { useTodosSelector } from "../core/Hooks";


function TodoGroup() {

    const groups = useTodosSelector(x => x.tgroups)
    const navigate = useNavigate()

    const formatted: {name: string, numItems: number, id: string}[] = []

    groups.forEach((v, k) => {
        formatted.push({
            name: v.name,
            numItems: v.items.length,
            id: v.id
        })
    })

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Group Name</TableCell>
                            <TableCell align="right"># of tasks</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            formatted.map(x => <GroupRow name={x.name} id={x.id} numItems={x.numItems} />)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={() => { navigate('/') }}>Go to home</Button>
        </Box>
    )
}

export default TodoGroup;