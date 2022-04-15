import {v4 as uuid} from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";
import TodoGroup from "../core/TodoGroup";
import Todo from '../core/Todo'
import { createGroup, createTodo, RootState } from "../store/default";

import Button from '@mui/material/Button'
import { Grid } from '@mui/material';
import { useTodosSelector } from '../core/Hooks';
import { createNewTodoAsync } from '../core/logic/TodoLogic';


function HomePage(props: any) {
    const groups = useTodosSelector(x => x.tgroups)
    const dispatch = useDispatch()
    
    const list: TodoGroup[] = []
    groups.forEach((v, k) => {
        list.push(v)
    })

    function addRandom() {
        
        let id = uuid()
        let name = uuid()

            dispatch(createGroup({
                group_id: id,
                group_name: name
            }))

        for(let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
            createNewTodoAsync('Random Task', id).then(todo => {
                dispatch(createTodo({
                    item: todo
                }))
            })
            
            console.log('Added a random todo!')
        }
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
            </p>
        </>
    )
}

export default HomePage;