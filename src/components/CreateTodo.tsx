import { Box, Button, Divider, Fade, FormControl, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthorization } from "../core/Hooks";
import { createTodoThunk } from "../store/thunks/TodoThunks";

function CreateTodo(props: {open: boolean, group_id: string, close_fn: () => void}) {
    const [taskText, setTaskText] = useState('')
    const dispatch = useDispatch()

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
        dispatch(createTodoThunk({
            group_id: props.group_id,
            text: taskText
        }))
        setTaskText('')
        props.close_fn()
    }

    return (
        <Modal
            open={props.open}
            onClose={() => {
                setTaskText('')
                props.close_fn()
            }}>
            <Fade in={props.open}>
                <Box sx={style}>
                    <Typography variant='h6' component='h2'>
                        Create new Task
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <FormControl>
                            <TextField id='task_details' onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setTaskText(event.target.value)
                                }} 
                                value={taskText}
                                label='Task Details'
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

export default CreateTodo;