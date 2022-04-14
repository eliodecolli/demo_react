import TodoGroup from '../core/TodoGroup';

function TodoCard(props: {
    item: TodoGroup;
}) {
    
    return (
        <div>
            <p>{props.item.name}</p>
            <ul>
                <li>
                    <ul>
                    {
                        props.item.items.map(x => 
                            <li>{x.text + " | " + x.deadline}</li>
                        )
                    }
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default TodoCard;