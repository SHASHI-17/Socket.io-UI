import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import { LayoutLoader } from './components/layout/Loaders';


const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/login'));
const Chat = lazy(() => import('./pages/chat'));
const Groups = lazy(() => import('./pages/groups'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));

const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));

const NotFound = lazy(() => import('./pages/NotFound'));

let user = true;

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/chat/:chatId' element={<Chat />} />
            <Route path='/groups' element={<Groups />} />
          </Route>
          <Route path='/login' element={<ProtectedRoute user={!user} redirect='/'>
            <Login />
          </ProtectedRoute>} />

          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/user-management' element={<UserManagement />} />
          <Route path='/admin/messages' element={<MessageManagement />} />
          <Route path='/admin/chat-management' element={<ChatManagement />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />



          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App