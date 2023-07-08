import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import { Dashboard } from "./components/dashboard.js";
import { Auth } from "./components/auth.js";
import { Navbar } from './components/Navbar';
import { useCookies } from "react-cookie";
import NotAuthorized from './components/Authorized-401.js';
import AdminPanel from './components/adminPanel';
import { QueryClient, QueryClientProvider,useQueries } from '@tanstack/react-query';

export const queryClient = new QueryClient();

function App() {
  const [cookies] = useCookies(["access_token"]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/auth' element={<Auth />} />
            <Route path="/dashboard" element={!cookies.access_token ? <NotAuthorized /> : <Dashboard />} />
            <Route path="/adminPanel" element={!cookies.access_token ? <NotAuthorized /> : <AdminPanel />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
