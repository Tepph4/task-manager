// src/App.jsx
import { Routes, Route } from 'react-router-dom';
// import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import LoginLayout from './layouts/LoginLayout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
