import { Checkbox, IconButton, ListItemButton, ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem'
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from '../core/Todo';
import { removeTodo, RootState, toggleTodo } from '../store/default';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthorization, useTodosSelector } from '../core/Hooks';
import { removeTodoAsync, toggleTodoAsync } from '../core/logic/TodoLogic';

function TodoTask(props: {
    item: Todo
}) {
    const [_, token] = useAuthorization()
    const isCompleted = useTodosSelector(state => {
        let group = state.tgroups.get(props.item.group_id)

        if ( group ) {
            let item = group.items.find(x => x.id == props.item.id)
            if ( item ) {
                return item.completed
            }
        }
    })

    const dispatch = useDispatch()

    function handleToggle() {
        if ( token ) {
            toggleTodoAsync(token, props.item.id).then(() => {
                dispatch(toggleTodo({
                    group_id: props.item.group_id,
                    todo_id: props.item.id
                }))
            })
        }
    }

    function handleDelete() {
        if ( token ) {
            removeTodoAsync(token, props.item.id).then(() => {
                dispatch(removeTodo({
                    group_id: props.item.group_id,
                    todo_id: props.item.id
                }))
            })
        }
    }

    return (
        <ListItem>
            <ListItemButton component="button" onClick={handleToggle} selected={isCompleted}>
                <ListItemText primary={props.item.text} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }} />
            </ListItemButton>
            <IconButton edge="end" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}

export default TodoTask;