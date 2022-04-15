import { useDispatch, useSelector } from 'react-redux';
import { useAuthorization } from './core/Hooks';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import { login } from './store/default';

function App() {

  const auth = useAuthorization()
  const dispatch = useDispatch()
  
  if (auth) {
    return <HomePage />
  }
  else {
    return (
      <Login />
    )
  }
}

export default App;
