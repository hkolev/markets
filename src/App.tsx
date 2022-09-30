import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Router } from './pages/router';
import Container from '@mui/material/Container';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MenuBar } from './components/menu-bar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 7000,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <MenuBar />
          <Router />
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
