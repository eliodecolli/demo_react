import TodoCard from "../components/TodoCard";
import TodoGroup from "../core/TodoGroup";

import Button from '@mui/material/Button'
import { Grid } from '@mui/material';
import { useTodosSelector } from '../core/Hooks';
import { useNavigate } from 'react-router';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGroupsThunk } from "../store/thunks/TodoThunks";


function HomePage(props: any) {
    const groups = useTodosSelector(x => x.tgroups)
    const navigate = useNavigate()
    
    const list: TodoGroup[] = []
    groups.forEach((v, k) => {
        list.push(v)
    })

    return (
        <>
            <Grid container spacing={1}>
                {
                    list.map(x => {
                        return <Grid item key={x.id}>
                            <TodoCard item={x} key={x.id}></TodoCard>
                        </Grid>
                    })
                }
            </Grid>
            <p>
                <Button variant="contained" onClick={() => { navigate('/groups') }}>Go to groups</Button>
            </p>
        </>
    )
}

export default HomePage;