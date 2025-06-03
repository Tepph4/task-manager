// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-xl">Welcome,</h1>
      <h2 className="text-xl">ID : {user?.id}, {user?.username}</h2>
      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2">Logout</button>
    </div>
  );
}

export default Dashboard;
