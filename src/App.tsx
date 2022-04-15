import { useAuthorization } from './core/Hooks';
import HomePage from './pages/HomePage';
import Login from './pages/Login';

function App() {

  const auth = useAuthorization()
  
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
