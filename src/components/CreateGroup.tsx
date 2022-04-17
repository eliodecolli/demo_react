import { Box, Button, Divider, Fade, FormControl, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthorization } from "../core/Hooks";
import { createNewTodoAsync, createTodoGroupAsync } from "../core/logic/TodoLogic";
import { createGroup, createTodo } from "../store/default";

function CreateGroup(props: {open: boolean, close_fn: () => void}) {
    const [groupName, setGroupName] = useState('')
    const dispatch = useDispatch()

    const [_, token] = useAuthorization()
    
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    function handleCreate() {
        if ( token ) {
            createTodoGroupAsync(token, groupName).then(group => {
                dispatch(createGroup({
                    group_id: group.id,
                    group_name: groupName,
                    items: []
                }))
                setGroupName('')
                props.close_fn()
            })
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={() => {
                setGroupName('')
                props.close_fn()
            }}>
            <Fade in={props.open}>
                <Box sx={style}>
                    <Typography variant='h6' component='h2'>
                        Create new Task
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <FormControl>
                            <TextField id='group_name' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setGroupName(event.target.value)
                                }} 
                                value={groupName}
                                label='Group Name'
                            />
                            <Divider />
                            <Button variant='contained' onClick={handleCreate}>Submit</Button>
                        </FormControl>
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CreateGroup;