import {v4 as uuid} from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import TodoCard from "../components/TodoCard";
import TodoGroup from "../core/TodoGroup";
import Todo from '../core/Todo'
import { createGroup, createTodo, StoreState } from "../store/default";


function HomePage(props: any) {
    const groups = useSelector((state: StoreState) => state.tgroups)
    const dispatch = useDispatch()
    
    const list: TodoGroup[] = []
    groups.forEach((v, k) => {
        list.push(v)
    })

    function addRandom() {
        let id = uuid()
        let name = uuid()

        let todo: Todo = {
            id: uuid(),
            group_id: id,
            text: "Random Todo",
            created_on: "NOW",
            deadline: "NEVER"
        }

        dispatch(createGroup({
            group_id: id,
            group_name: name
        }))
        dispatch(createTodo({
            item: todo
        }))

        console.log('Added a random todo!')
    }

    return (
        <>
            <div>
            {
                list.map(x => <TodoCard item = {x} ></TodoCard>)
            }
            </div>
            <p>
                <button onClick={addRandom}>Add Random</button>
            </p>
        </>
    )
}

export default HomePage;