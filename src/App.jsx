import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Courses from './pages/Courses'
import Certificates from './pages/Certificates'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AuthGuard from './components/AuthGuard'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
      <Route path="/courses" element={<AuthGuard><Courses /></AuthGuard>} />
      <Route path="/certificates" element={<AuthGuard><Certificates /></AuthGuard>} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default App
