import {v4 as uuid} from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";
import TodoGroup from "../core/TodoGroup";
import Todo from '../core/Todo'
import { createGroup, createTodo, RootState } from "../store/default";

import Button from '@mui/material/Button'
import { Grid } from '@mui/material';
import { useTodosSelector } from '../core/Hooks';
import { createNewTodoAsync, createTodoGroupAsync } from '../core/logic/TodoLogic';
import { useNavigate } from 'react-router';


function HomePage(props: any) {
    const groups = useTodosSelector(x => x.tgroups)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const list: TodoGroup[] = []
    groups.forEach((v, k) => {
        list.push(v)
    })

    function addRandom() {
        createTodoGroupAsync(uuid()).then(x => {
            dispatch(createGroup({
                group_id: x.id,
                group_name: x.name
            }))
    
            for(let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
                createNewTodoAsync('Random Task', x.id).then(todo => {
                    dispatch(createTodo({
                        item: todo
                    }))
                })
                
                console.log('Added a random todo!')
            }
        })
    }

    return (
        <>
            <Grid container spacing={1}>
                {
                    list.map(x => {
                        return <Grid item>
                            <TodoCard item={x}></TodoCard>
                        </Grid>
                    })
                }
            </Grid>
            <p>
                <Button variant="contained" onClick={addRandom}>Add Random</Button>
                <Button variant="contained" onClick={() => { navigate('/groups') }}>Go to groups</Button>
            </p>
        </>
    )
}

export default HomePage;