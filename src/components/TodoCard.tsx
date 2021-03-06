import TodoGroup from '../core/TodoGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isTemplateExpression } from 'typescript';
import TodoTask from './TodoRow';
import { useState } from 'react';
import CreateTodo from './CreateTodo';

function TodoCard(props: {
    item: TodoGroup;
}) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleCloseModal() {
        setIsModalOpen(false)
    }
    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {props.item.name}
                </Typography>
                <Typography variant="body2">
                    {
                        props.item.items.map(x => {
                            return <TodoTask key={x.id} item={x}></TodoTask>
                        })
                    }
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="outlined" onClick={() => setIsModalOpen(true)}>Create new task</Button>
            </CardActions>
            <CreateTodo open={isModalOpen} group_id={props.item.id} close_fn={handleCloseModal} />
        </Card>
    )
}

export default TodoCard;