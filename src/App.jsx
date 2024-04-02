import React, { Suspense, lazy, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import { LayoutLoader } from './components/layout/Loaders';
import { server } from './lib/config';
import { useDispatch, useSelector } from 'react-redux'
import { userExists, userNotExists } from './redux/reducer/auth';
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from '../Socket'


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

const App = () => {

  const { user, loader ,userExist} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${server}/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data)))
      .catch((err) => dispatch(userNotExists()));
  }, [])


  return loader ? <LayoutLoader /> : (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={
            <SocketProvider>
              <ProtectedRoute user={user} />
            </SocketProvider>
          }
          >
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
      <Toaster position='bottom-center' />
    </Router>
  )
}

export default App