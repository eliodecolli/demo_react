import { Navigate } from 'react-router';
import { useAuthorization } from './core/Hooks';

function Authorized({ children }: { children: JSX.Element }) {
  const auth = useAuthorization()

  if (!auth ) {
    return <Navigate to="/login" replace={true} />
  }
  else {
    return children
  }
}

export default Authorized;
