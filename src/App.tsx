import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router';
import { useAuthorization, useWorkerAwaiter } from './core/Hooks';
import { getGroupsAsync } from './core/logic/TodoLogic';
import HomePage from './pages/HomePage';
import { CreateGroup } from './store/actions/GroupActions';
import { createGroup } from './store/default';

function App() {
  const [auth, token] = useAuthorization()
  const [_, setWorkerAwait] = useWorkerAwaiter()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if ( !auth || !token )
      navigate('/login')
    else {
      // load groups
     setWorkerAwait(true)

      getGroupsAsync(token).then(x => {
        x.forEach(group => {
          const action: CreateGroup = {
            group_id: group.id,
            group_name: group.name,
            items: group.items
          }

          dispatch(createGroup(action))
        })
      }).then(() => {
        setTimeout(() => setWorkerAwait(false), 400)
      })
    }
  }, [])

  return <HomePage />
}

export default App;
