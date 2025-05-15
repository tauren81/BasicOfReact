import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginButton } from './components/loginbutton';
import { ProtectedRoute } from './components/protectedroute';
import { CallbackPage } from './pages/callbackpage';
import { useAuthStore } from './store/authstore';

function Dashboard() {
  return (
    <>
      <div>Dashboard</div>
    </>
  );
}

function AdminPanel() {
  return <div>Admin Panel</div>;
}

function Unauthorized() {
  return <div>You don&apos;t have permission to view this page</div>;
}

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginButton />
    </div>
  );
}

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* не хватило ума добавить Permission <Route element={<ProtectedRoute requiredPermission="view_dashboard" />}>*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute requiredPermission="delete_user" />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
