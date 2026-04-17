import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { RequestList } from './pages/RequestList';
import { RequestDetail } from './pages/RequestDetail';
import { NewRequest } from './pages/NewRequest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests" element={<RequestList />} />
          <Route path="/requests/:id" element={<RequestDetail />} />
          <Route path="/new" element={<NewRequest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
