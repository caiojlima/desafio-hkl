import './App.css';
import UserProvider from './providers/userProvider';
import QueryProvider from './providers/queryProvider';
import { RoutingProvider } from './providers/routeProvider';

function App() {
  return (
    <QueryProvider>
      <UserProvider>
        <RoutingProvider />
      </UserProvider>
    </QueryProvider>
  );
}

export default App;
