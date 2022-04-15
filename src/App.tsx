import { useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router';
import { useAuthorization } from './core/Hooks';
import HomePage from './pages/HomePage';

function App() {
  const auth = useAuthorization()
  const navigate = useNavigate()
  
  useEffect(() => {
    if ( !auth )
      navigate('/login')
  }, [])

  return <HomePage />
}

export default App;
